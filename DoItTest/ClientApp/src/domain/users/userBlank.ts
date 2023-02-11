import { User } from './user';
import { RoleType } from './userType';

export class UserBlank {
    public constructor(
        public id: string | null,
        public login: string | null,
        public password: string | null,
        public role: RoleType | null
    ) { }

    public static getDefault(): UserBlank {
        return new UserBlank(null, null, null, null)
    }

    public static formUser(user: User): UserBlank {
        return new UserBlank(user.id, user.login, user.password, user.role)
    }
}
