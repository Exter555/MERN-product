import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Createpage from "./pages/Createpage";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/create" element={<Createpage />}></Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
