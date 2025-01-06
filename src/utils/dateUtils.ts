export function formatUnixTime(unixTime: number) {
    const date = new Date(unixTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export function parseDate(dateStr: string): number {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day).getTime();
} 