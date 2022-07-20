import React from 'react'
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';

const FormInput = ( props ) => {

  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <Grid xs={12} sm={12} item>
      <label>{label}</label>
      <TextField
        {...inputProps}
        placeholder={inputProps.placeholder}
        label= {label}
        variant="outlined"
        type={inputProps.type}
        onChange={onChange}
        fullWidth
        required
      />
    </Grid>
  );
}

export default FormInput
