import { HttpRequest } from "tools/httpClient/httpClient";
import { PagedResult } from "tools/results/pagedResult";
import { Result } from "tools/results/result";
import { TestItem } from "./items/testItem";
import { mapToTestItem, mapToTestItems } from "./items/testItemsUtils";
import { mapToTest, mapToTests, Test } from "./test";
import { TestBlank } from "./testBlank";
import { TestItemBlank } from "./testItemBlank";
import { mapToStudentTest } from "./studentTest";
import { DataResult, mapToDataResult } from "tools/results/dataResult";
import { mapToTestInfo } from "./testInfo";
import { StudentBlank } from "domain/students/studentBlank";
import { Student, mapToStudent } from "domain/students/student";
import { AnswerBlank } from "domain/answers/answerBlank";
import { StartTestResponse, mapToStartTestResponse } from "./startTestResponse";

export class TestsProvider {

    public static async answerQuestion(answerBlank: AnswerBlank): Promise<DataResult<TestItem | null>> {
        const result = await HttpRequest.post("/Tests/AnswerQuestion").withBody(answerBlank).asAny()
        if (!result.isSuccess || result.data == null) return mapToDataResult(result)

        return DataResult.get(result, mapToTestItem);
    }

    public static async startTest(studentBlank: StudentBlank, testId: string): Promise<DataResult<StartTestResponse>> {
        const result = await HttpRequest.post("/Tests/Start").withBody({ studentBlank, testId }).asAny()
        if (!result.isSuccess) return mapToDataResult(result)

        return DataResult.get(result, mapToStartTestResponse);
    }

    public static async finishTest(studentId: string, testId: string) {
        const result = await HttpRequest.post("/Tests/Finish").withBody({ studentId, testId }).asResult()
        return result;
    }

    public static async saveTest(testBlank: TestBlank, testItemBlanks: TestItemBlank[]) {
        const result = await HttpRequest.post("/Tests/Save").withBody({ testBlank, testItemBlanks }).asResult()
        return result;
    }

    public static async getTest(id: string): Promise<Test> {
        const result = await HttpRequest.get("/Tests/GetTest").withQueryParams({ id }).asAny()
        return mapToTest(result)
    }

    public static async getPagedTests(page: number, count: number): Promise<PagedResult<Test>> {
        const result = await HttpRequest.get("/Tests/GetPaged").withQueryParams({ page, count }).asAny()
        return PagedResult.convert(result, mapToTest);
    }

    public static async removeTest(id: string): Promise<Result> {
        const result = await HttpRequest.post("/Tests/Remove").withBody(id).asResult()
        return result;
    }

    public static async getItemForPassing(testId: string, studentId: string): Promise<DataResult<TestItem | null>> {
        const result = await HttpRequest.get("/Tests/GetItemForPassing").withQueryParams({ testId, studentId }).asAny()
        if (result.data == null) return mapToDataResult(result)

        return DataResult.get(result, mapToTestItem);
    }

    public static async getTestItems(testId: string): Promise<TestItem[]> {
        const result = await HttpRequest.get("/Tests/GetItems").withQueryParams({ testId }).asAny()
        return mapToTestItems(result)
    }

    // public static async getStudentTest(testId: string, studentId: string) {
    //     const result = await HttpRequest.get("/Tests/GetStudentTest").withQueryParams({ testId, studentId }).asAny()
    //     return mapToStudentTest(result)
    // }

    public static async getTestInfo(testId: string) {
        const result = await HttpRequest.get("/Tests/GetInfo").withQueryParams({ testId }).asAny()
        return mapToTestInfo(result)
    }

    public static async getActiveTestId(studentId: string): Promise<string | null> {
        const result = await HttpRequest.get("/Tests/GetActiveTestId").withQueryParams({ studentId }).asAny()
        return result
    }

    public static async getStartTestBeginDateTime(testId: string, studentId: string): Promise<Date | null> {
        const result = await HttpRequest.get("/Tests/GetStartTestBeginDateTime").withQueryParams({ testId, studentId }).asAny()
        return result != null ? new Date(result) : null;
    }
}