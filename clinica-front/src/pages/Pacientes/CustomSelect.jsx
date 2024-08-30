import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomSelect = ({ name, label, options, value, handleChange }) => (
  <FormControl margin="dense" fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      value={value}
      onChange={handleChange}
      label={label}
      fullWidth
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CustomSelect;