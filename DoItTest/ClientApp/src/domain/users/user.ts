import { RoleType } from './userType';

export class User {
    public constructor(
        public readonly id: string,
        public readonly login: string,
        public readonly password: string,
        public readonly role: RoleType
    ) { }
}

export function mapToUser(value: any): User {
    return new User(value.id, value.login, value.password, value.role)
}

export function mapToUsers(value: any[]): User[] {
    return value.map(mapToUser);
}
