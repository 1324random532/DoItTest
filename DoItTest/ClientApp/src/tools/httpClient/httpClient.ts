import { NeverUnreachable } from "tools/errors/neverUnreachable"
import { Result } from "tools/results/result"


type HttpMethodType = "GET" | "POST"
type BodyType = "data" | "formData"
type NoContent = null

const defaultHeaders: Headers = new Headers({
    'X-Requested-With': 'XMLHttpRequest'
})

export class HttpRequest {
    private readonly method: HttpMethodType
    private readonly url: string
    private queryParameters: any | null = null;
    private body: { data: any, type: BodyType } | null = null;
    private headers: Headers | null = null

    private constructor(method: HttpMethodType, url: string) {
        this.method = method
        this.url = url
    }

    public static setDefaultHeaders(headers: Record<string, string>) {
        for (const key in headers) {
            defaultHeaders.set(key, headers[key])
        }
    }

    public static get(url: string): HttpRequest {
        return new HttpRequest('GET', url)
    }

    public static post(url: string): HttpRequest {
        return new HttpRequest('POST', url)
    }

    public withQueryParams(parameters: any): HttpRequest {
        this.queryParameters = parameters
        return this
    }

    public withBody(data: any, type: BodyType = "data"): HttpRequest {
        this.body = { data, type }
        return this
    }

    public withHeaders(headers: Headers): HttpRequest {
        this.headers = headers
        return this
    }

    public async asAny(): Promise<any> {
        const response = await this.perform()
        if (response == null) return null

        return await response.json()
    }

    public async asResult(): Promise<Result> {
        const response = await this.perform()
        if (response == null) throw 'response is null'

        const json = await response.json()

        return Result.get(json)
    }

    public async perform(): Promise<Response | NoContent> {
        let { url, queryParameters, method, headers: requestHeaders } = this

        const headers = requestHeaders ?? defaultHeaders

        const queryParams = HttpRequest.buildQueryParams(queryParameters)

        if (!String.isNullOrWhitespace(queryParams))
            url = `${url}${queryParams}`

        let body = undefined
        if (this.body != null) {
            switch (this.body.type) {
                case "data":
                    headers.append('Content-Type', 'application/json')
                    body = JSON.stringify(this.body.data)
                    break

                case "formData":
                    // headers.append('Content-Type', 'multipart/form-data');
                    headers.append('Enctype', 'multipart/form-data')
                    body = HttpRequest.buildFormData(this.body.data)
                    break

                default: throw new NeverUnreachable(this.body.type)
            }
        }

        let response = await fetch(url, { method, headers, body })

        return await HttpRequest.handleResponse(response)
    }

    private static buildQueryParams(obj: any) {
        if (obj == null) return ''

        const parameters = []

        for (var key of Object.keys(obj)) {
            const value = obj[key]
            if (value == null) continue

            if (Array.isArray(value)) {
                const values = value as any[]
                if (values.length === 0) continue

                for (var v of values) parameters.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
            }
            else if (value instanceof Date) {
                parameters.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toISOString())}`)
            }
            else {
                parameters.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            }
        }

        if (parameters.length === 0) return ''

        return '?' + parameters.join('&')
    }

    private static buildFormData(data: any) {
        const formData = new FormData()

        function build(data: any, parentKey: string | null = null) {
            const isObject = typeof data === 'object'
            const isDate = data instanceof Date
            const isFile = data instanceof File

            if (isObject && !isDate && !isFile) {
                for (const key of Object.keys(data)) {
                    const childKey = parentKey != null ? `${parentKey}[${key}]` : key
                    build(data[key], childKey)
                }

                return formData
            }

            if (parentKey == null) throw 'formData не может быть примитивным типом'

            const value = data == null ? '' : data
            formData.append(parentKey, value)

            return formData
        }

        return build(data)
    }

    private static handleResponse(response: Response): Promise<Response | NoContent> {
        if (response.redirected) {
            window.location.href = response.url
            return Promise.reject()
        }

        const noContentStatus = 204
        if (response.status == noContentStatus) return Promise.resolve(null)

        if (response.ok) return Promise.resolve(response)

        //window.location.href = InfrastructureLinks.Errors.statusCode(response.status);
        return Promise.reject(`${response.status} - unknown status code`)
    }
}
