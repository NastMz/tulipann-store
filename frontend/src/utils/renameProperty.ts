export function renameProperties(obj: any, mapping: { [key: string]: string }) {
    return Object.keys(mapping).reduce((acc: any, key) => {
        acc[mapping[key]] = obj[key];
        return acc;
    }, {});
}