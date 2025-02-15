import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";

export default function Button({ children, onClick, variant = "contained", color = "primary" }) {
  return (
    <MuiButton onClick={onClick} variant={variant} color={color} sx={{ mt: 2, textTransform: "none" }}>
      {children}
    </MuiButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
};

export { Button };
