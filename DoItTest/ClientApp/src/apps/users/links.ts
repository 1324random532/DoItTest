export class UsersLinks {
    static list = "/Users"
    static add = "/Users/Edit"
    static editTemplate = "/Users/Edit/:userId";
    static edit = (userId: string) => `/Users/Edit/${userId}`;
}
