import React from "react";
import useAxios from "../../hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { StudentResponse } from "../../model/students";

const useStudentApi = () => {
    const { get } = useAxios();

    const getNearbyStudents = React.useCallback(
        async (queryString: string, config?: AxiosRequestConfig) =>
            await get<StudentResponse[]>(
                `students/nearby?${queryString}`,
                config
            ).then((res) => res.data),
        [get]
    );

    return { getNearbyStudents };
};

export default useStudentApi;
