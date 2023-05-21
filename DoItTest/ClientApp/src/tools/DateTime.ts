import { format } from 'date-fns';

export function formatFullDateTime(date: Date | null, emptyValue: string = '—'): string {
    if (date == null) return emptyValue

    return format(date, "dd.MM.yyyy:HH:mm")
}