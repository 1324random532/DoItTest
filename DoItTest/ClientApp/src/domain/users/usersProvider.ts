import { HttpRequest } from 'tools/httpClient/httpClient';
import { Result } from 'tools/results/result';
import { mapToUser, mapToUsers, User } from './user';
import { UserBlank } from './userBlank';

export class UsersProvider {
    // public static async getPagedUsers(page: number, count: number): Promise<PagedResult<User>> {
    //     const result = await HttpClient.getJsonAsync("/Users/GetPaged", { page, count })
    //     return new PagedResult(mapToUsers(result.values), result.totalRows);
    // }

    // public static async getUserById(id: string): Promise<User> {
    //     const result = await HttpClient.getJsonAsync("/Users/GetById", { id })
    //     return mapToUser(result);
    // }

    // public static async saveUser(userBlank: UserBlank): Promise<Result> {
    //     const result = await HttpClient.postJsonAsync("/Users/Save", userBlank);
    //     return mapToResult(result)
    // }

    // public static async removeUser(id: string): Promise<Result> {
    //     const result = await HttpClient.postJsonAsync("/Users/Remove", id)
    //     return mapToResult(result)
    // }

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
