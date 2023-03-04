import { HttpRequest } from "tools/httpClient/httpClient";
import { PagedResult } from "tools/results/pagedResult";
import { Result } from "tools/results/result";
import { TestItem } from "./items/testItem";
import { mapToTestItems } from "./items/testItemsUtils";
import { mapToTest, mapToTests, Test } from "./test";
import { TestBlank } from "./testBlank";
import { TestItemBlank } from "./testItemBlank";

export class TestsProvider {

    public static async saveTest(testBlank: TestBlank, testItemBlanks: TestItemBlank[]) {
        const result = await HttpRequest.post("/Tests/Save").withBody({ testBlank, testItemBlanks }).asResult()
        return result;
    }

    public static async getTest(testId: string): Promise<Test> {
        const result = await HttpRequest.get("Tests/GetTest").withQueryParams({ testId }).asAny()
        return mapToTest(result)
    }

    public static async getPagedTests(userId: string, page: number, count: number): Promise<PagedResult<Test>> {
        const result = await HttpRequest.get("/Tests/GetPaged").withQueryParams({ userId, page, count }).asAny()
        return PagedResult.convert(result, mapToTest);
    }

    public static async removeTest(testId: string): Promise<Result> {
        const result = await HttpRequest.post("/Tests/Remove").withBody({ testId }).asResult()
        return result;
    }

    public static async geTestItems(testId: string): Promise<TestItem[]> {
        const result = await HttpRequest.get("/Tests/GetItems").withQueryParams({ testId }).asAny()
        return mapToTestItems(result)
    }
}