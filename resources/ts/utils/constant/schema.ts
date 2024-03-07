import * as yup from "yup";

export const SearchStudentFormSchema = yup.object({
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
