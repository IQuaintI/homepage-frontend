import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function Input({ value, onChange, placeholder, fullWidth = true }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      variant="outlined"
      sx={{ mt: 1 }}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export { Input };
