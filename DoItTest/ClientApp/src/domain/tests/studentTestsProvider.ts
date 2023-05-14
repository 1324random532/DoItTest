import { HttpRequest } from "tools/httpClient/httpClient";
import { PagedResult } from "tools/results/pagedResult";
import { StudentTest, mapToStudentTest } from "./studentTest";
import { DataResult, mapToDataResult } from "tools/results/dataResult";
import { mapToTestInfo } from "./testInfo";
import { StudentBlank } from "domain/students/studentBlank";
import { Student, mapToStudent } from "domain/students/student";
import { AnswerBlank } from "domain/answers/answerBlank";
import { StartTestResponse, mapToStartTestResponse } from "./startTestResponse";
import IStudentTestFilter from "./studentTestFilter";
import ITestsFilter from "./ITestsFilter";

export class StudentTestsProvider {

    public static async getStudentTest(id: string): Promise<StudentTest | null> {
        const result = await HttpRequest.get("/StudentTests/GetStudentTest").withQueryParams({ id }).asAny()
        return mapToStudentTest(result)
    }

    public static async getPagedStudentTest(studentTestFilter: IStudentTestFilter): Promise<PagedResult<StudentTest>> {
        const result = await HttpRequest.post("/StudentTests/GetPaged").withBody(studentTestFilter).asAny()
        return PagedResult.convert(result, mapToStudentTest);
    }
}