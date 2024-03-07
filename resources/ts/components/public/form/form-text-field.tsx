import React, { forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const FormTextField = forwardRef<HTMLDivElement, TextFieldProps>(
    (props, ref) => {
        return <TextField {...props} fullWidth variant="outlined" ref={ref} />;
    }
);

export default FormTextField;
