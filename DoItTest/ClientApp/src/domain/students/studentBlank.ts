import { Student } from "./student"

export class StudentBlank {
    public constructor(
        public readonly id: string | null,
        public readonly firstName: string | null,
        public readonly lastName: string | null,
        public readonly patronymic: string | null,
        public readonly group: string | null
    ) { }

    public static getDefault(): StudentBlank {
        return new StudentBlank(null, null, null, null, null)
    }

    public static formStudent(student: Student): StudentBlank {
        return new StudentBlank(student.id, student.firstName, student.lastName, student.patronymic, student.group)
    }
}