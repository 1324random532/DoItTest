import { HttpRequest } from "tools/httpClient/httpClient";
import { StudentBlank } from "./studentBlank";
import { DataResult, mapToDataResult } from "tools/results/dataResult";

export class StudentsProvider {

    public static async saveStudent(studentBlank: StudentBlank): Promise<DataResult<string>> {
        const result = await HttpRequest.post("/Students/Save").withBody({ studentBlank }).asAny()
        return DataResult.get(result, toString);
    }
}