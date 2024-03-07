import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useStudents from "../../hooks/useStudents";
import type { ISearchStudentForm } from "../../model";
import { objectToQueryString } from "../../utils/helper";
import { SearchStudentFormSchema } from "../../utils/constant";

import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { FormTextField } from "../public";
import StudentList from "./student-list";

const SearchStudentForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ISearchStudentForm>({
        defaultValues: {
            latitude: -27.401,
            longitude: 153.061,
            radius: 10,
        },
        resolver: yupResolver(SearchStudentFormSchema),
        mode: "onChange",
    });

    const { mutate, data = [], isPending } = useStudents();
    const sortedData = data?.sort((a, b) => a.distanceInKm - b.distanceInKm);

    const onSubmit: SubmitHandler<ISearchStudentForm> = async (data) => {
        const queryString: string = objectToQueryString(data);
        mutate(queryString);
    };

    return (
        <Stack alignItems="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="latitude"
                            control={control}
                            render={({ field }) => (
                                <FormTextField
                                    label="Latitude"
                                    error={Boolean(errors.latitude)}
                                    helperText={errors.latitude?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="longitude"
                            control={control}
                            render={({ field }) => (
                                <FormTextField
                                    label="Longitude"
                                    error={Boolean(errors.longitude)}
                                    helperText={errors.longitude?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="radius"
                            control={control}
                            render={({ field }) => (
                                <FormTextField
                                    label="Radius"
                                    error={Boolean(errors.radius)}
                                    helperText={errors.radius?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item display="flex" justifyContent="end" xs={12}>
                        <LoadingButton
                            type="submit"
                            loading={isPending}
                            loadingIndicator="Loading…"
                            variant="outlined"
                        >
                            <span>Submit</span>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>

            {isPending && <h1>Loading...</h1>}

            <StudentList students={sortedData} />
        </Stack>
    );
};

export default SearchStudentForm;
