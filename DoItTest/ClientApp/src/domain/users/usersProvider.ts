import { HttpRequest } from 'tools/httpClient/httpClient';
import { PagedResult } from 'tools/results/pagedResult';
import { Result } from 'tools/results/result';
import { mapToUser, mapToUsers, User } from './user';
import { UserBlank } from './userBlank';

export class UsersProvider {

    public static async saveUser(userBlank: UserBlank): Promise<Result> {
        const result = await HttpRequest.post("/Users/Save").withBody(userBlank).asResult()
        return result
    }

    public static async getUserById(id: string): Promise<User> {
        const result = await HttpRequest.get("/Users/GetById").withQueryParams({ id }).asAny()
        return mapToUser(result)
    }

    public static async getPagedUsers(page: number, count: number): Promise<PagedResult<User>> {
        const result = await HttpRequest.get("/Users/GetPaged").withQueryParams({ page, count }).asAny()
        return PagedResult.convert(result, mapToUser);
    }

    public static async removeUser(id: string): Promise<Result> {
        const result = await HttpRequest.post("/Users/Remove").withBody(id).asResult()
        return result;
    }

    public static async registration(login: string, password: string): Promise<Result> {
        const result = await HttpRequest.post("/Registration").withBody({ login, password }).asResult()
        return result;
    }

    public static async logIn(login: string, password: string): Promise<Result> {
        const result = await HttpRequest.post("/Authorize").withBody({ login, password }).asResult()
        return result;
    }

    public static async logOut(): Promise<Result> {
        const result = HttpRequest.post("/LogOut").asResult()
        return result
    }
}
