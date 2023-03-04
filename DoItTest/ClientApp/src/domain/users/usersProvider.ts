import { HttpRequest } from 'tools/httpClient/httpClient';
import { Result } from 'tools/results/result';
import { mapToUser, mapToUsers, User } from './user';
import { UserBlank } from './userBlank';

export class UsersProvider {
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
