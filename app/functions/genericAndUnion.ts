export function getfirstItem<T>(array: T[]): T | undefined {
    return array.length > 0 ? array[0] : undefined;
}

export function describeValue(value: number | string): string {
    if(typeof value === 'number') {
        return `The number is ${value}`;
    } else {
        return `The string is ${value}`;
    }
}