import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: "rgb(252,236,204)", // Specify your custom background color here
  borderRadius: "0.75rem"
}));

export default WidgetWrapper;
