export class DateTimePeriod {
    public constructor(
        public readonly beginDateTime: Date | null,
        public readonly endDateTime: Date | null,
    ) { }
}