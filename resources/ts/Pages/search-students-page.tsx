import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
import { PageLayout } from "../Layouts";

interface SearchStudentForm {
    latitude: number;
    longitude: number;
    radius: number;
}

const SearchStudentFormSchema = yup.object({
    latitude: yup
        .number()
        .required()
        .min(-90)
        .max(90)
        .typeError("latitude must be a `number` type"),
    longitude: yup
        .number()
        .required()
        .min(-180)
        .max(180)
        .typeError("longitude must be a `number` type"),
    radius: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError("radius must be a `number` type"),
});

const SearchStudentsPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<SearchStudentForm>({
        resolver: yupResolver(SearchStudentFormSchema),
        mode: "onChange",
    });

    return (
        <PageLayout>
            <Typography variant="h3" component="h1">
                Search Nearby Students
            </Typography>

            <Container sx={{ marginTop: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="latitude"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Latitude"
                                    variant="outlined"
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
                                <TextField
                                    fullWidth
                                    label="Longitude"
                                    variant="outlined"
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
                                <TextField
                                    fullWidth
                                    label="Radius"
                                    variant="outlined"
                                    error={Boolean(errors.radius)}
                                    helperText={errors.radius?.message}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item display="flex" justifyContent="end" xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <DevTool control={control} /> {/* set up the dev tool */}
            </Container>
        </PageLayout>
    );
};

export default SearchStudentsPage;
