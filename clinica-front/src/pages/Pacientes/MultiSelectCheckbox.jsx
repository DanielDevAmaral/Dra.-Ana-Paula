import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox } from "@mui/material";

const MultiSelectCheckbox = ({ name, label, options, value, handleChange }) => (
  <FormControl margin="dense" fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      multiple
      name={name}
      value={value}
      onChange={(e) => handleChange({ target: { name, value: e.target.value } })}
      renderValue={(selected) => selected.join(", ")}
      label={label}
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox checked={value.includes(option)} />
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default MultiSelectCheckbox;