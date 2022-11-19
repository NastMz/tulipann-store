export function nameOf<T>(name: Extract<keyof T, any>) {
    return name;
}