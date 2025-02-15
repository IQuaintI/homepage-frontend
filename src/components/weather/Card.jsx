import PropTypes from "prop-types";
import { Card as MuiCard, CardContent as MuiCardContent, Typography } from "@mui/material";

export default function Card({ title, children }) {
  return (
    <MuiCard sx={{ borderRadius: 2, boxShadow: 3, mb: 2 }}>
      <MuiCardContent>
        {title && <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>{title}</Typography>}
        {children}
      </MuiCardContent>
    </MuiCard>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { Card };