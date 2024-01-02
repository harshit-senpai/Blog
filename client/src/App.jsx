import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navebar.component";
import UserAuthForm from "./pages/userAuthForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<UserAuthForm type="Sign-In" />} />
          <Route path="signup" element={<UserAuthForm type="Sign-Up" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
