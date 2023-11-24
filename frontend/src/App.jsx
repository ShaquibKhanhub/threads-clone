import { Container } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
function App() {
  return (
    <Container>
      <Router>
        <Header />

        <Routes>
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
