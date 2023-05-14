import { HttpRequest } from "tools/httpClient/httpClient"
import { Answer, mapToAnswers } from "./answer"

export class AnswerProvider {

    public static async getAnswers(studentTestId: string): Promise<Answer[]> {
        const result = await HttpRequest.get("/Answers/GetAnswers").withQueryParams({ studentTestId }).asAny()
        return mapToAnswers(result)
    }
}