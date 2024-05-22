import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ customColor })  => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: "rgb(252,236,204)", 
  borderRadius: "2rem",
  backgroundColor: customColor || "#0bb2a2",
}));

export default WidgetWrapper;
