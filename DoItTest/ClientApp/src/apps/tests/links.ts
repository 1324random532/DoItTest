export class TestLinks {
    static list = "/Tests"
    static add = "/Tests/New"
    static editTemplate = "/Tests/Edit/:testId";
    static edit = (testId: string) => `/Tests/Edit/${testId}`;
    static passingTemplate = "/Tests/Passing/:testId"
    static passing = (testId: string) => `/Tests/Passing/${testId}`
    static studentTests = "/StudentTests"
}