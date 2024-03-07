import React from "react";
import axiosInstance from "../apis/axios-instance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const useAxios = () => {
    //! useCallback here is used for preventing infinite loop /
    const get = React.useCallback(
        <T, R = AxiosResponse<T>>(
            url: string,
            config?: AxiosRequestConfig
        ): Promise<R> => axiosInstance.get(url, config ?? {}),
        []
    );

    return { get };
};

export default useAxios;
