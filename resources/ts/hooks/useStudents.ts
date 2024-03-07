import { useMutation } from "@tanstack/react-query";
import useStudentApi from "../apis/hooks/useStudentApi";
import { StudentResponse } from "../model/students";
import { useSnackbar } from "notistack";
import { isAxiosError } from "axios";

const useStudents = () => {
    const { getNearbyStudents } = useStudentApi();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation<StudentResponse[], Error, string>({
        mutationFn: (queryString) => getNearbyStudents(queryString),
        mutationKey: ["search-students"],
        onSuccess: (data) =>
            enqueueSnackbar(
                `${data.length} students found within the specific radius`,
                {
                    variant: "success",
                }
            ),
        onError: (err: Error) => {
            if (isAxiosError<{ error: string }>(err)) {
                const { error } = err.response?.data || {
                    error: "unknown error",
                };
                enqueueSnackbar(error, { variant: "error" });
            }
        },
    });
};

export default useStudents;
