export class Student {
    public constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly patronymic: string | null,
        public readonly group: string
    ) { }
}

export function mapToStudent(value: any): Student {
    return new Student(value.id, value.firstName, value.lastName, value.patronymic, value.group)
}

export function mapToStudents(value: any[]): Student[] {
    return value.map(mapToStudent);
}