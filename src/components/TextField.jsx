// WhiteTextField.js
import React from "react";
import { TextField } from "@mui/material";

const WhiteTextField = ({ label, register, required, error, helperText }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...register}
      error={error}
      helperText={helperText}
      sx={{
        input: { color: "white" },
        label: { color: "white" },
        "& label.Mui-focused": { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "white" },
          "&.Mui-focused fieldset": { borderColor: "white" },
        },
      }}
    />
  );
};

export default WhiteTextField;
