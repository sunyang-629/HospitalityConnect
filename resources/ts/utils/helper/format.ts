export function objectToQueryString(obj: Record<string, any>): string {
    const queryParams: string[] = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value !== undefined && value !== null) {
                queryParams.push(
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                );
            }
        }
    }
    return queryParams.join("&");
}

export const distanceNumberToString = (distance: number): string =>
    distance.toFixed(2) + "km";
