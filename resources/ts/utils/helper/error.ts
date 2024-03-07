import { isAxiosError } from "axios";

export const getErrorMessage = (err: Error) => {
    if (isAxiosError<{ error: string }>(err)) {
        const { error } = err.response?.data || {
            error: "unknown error",
        };
        return error;
    }
    return "Not an Axios Error";
};
