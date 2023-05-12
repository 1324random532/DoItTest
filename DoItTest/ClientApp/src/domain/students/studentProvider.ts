import { HttpRequest } from "tools/httpClient/httpClient";
import { StudentBlank } from "./studentBlank";
import { DataResult, mapToDataResult } from "tools/results/dataResult";
import { Student, mapToStudent, mapToStudents } from "./student";

export class StudentsProvider {

    public static async saveStudent(studentBlank: StudentBlank): Promise<DataResult<string>> {
        const result = await HttpRequest.post("/Students/Save").withBody(studentBlank).asAny()
        return DataResult.get(result, toString);
    }

    public static async getStudent(id: string): Promise<Student> {
        const result = await HttpRequest.get("/Students/GetStudent").withQueryParams({ id }).asAny()
        return mapToStudent(result)
    }

    public static async getStudents(ids: string[]): Promise<Student[]> {
        const result = await HttpRequest.get("/Students/GetStudents").withQueryParams({ ids }).asAny()
        return mapToStudents(result)
    }
}