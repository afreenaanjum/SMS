import React from "react";
import { TextField } from "@material-ui/core";

function CustomTextField({
  type,
  label,
  value,
  onChange,
  notchedOutlineSelect,
  styles,
}) {
  return (
    <TextField
      type={type}
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e)}
      size="small"
      className={styles}
      InputProps={{
        classes: {
          notchedOutline: notchedOutlineSelect,
        },
      }}
    />
  );
}

export default CustomTextField;
