import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";

import Home from "./pages/Home";
import BottomFooter from "./components/BottomFooter";

export default function App() {
  return (
    <BrowserRouter>
        <Container disableGutters>
          <Box sx={{ m: 0, p: 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

          <BottomFooter />
        </Box>
      </Container>
    </BrowserRouter>
  );
}
