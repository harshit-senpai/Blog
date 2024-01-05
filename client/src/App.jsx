import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navebar.component";
import UserAuthForm from "./pages/userAuthForm";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./utils/session";

export const userContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState();

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ token: null });
  }, []);

  return (
    <>
      <userContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="signin" element={<UserAuthForm type="Sign-In" />} />
            <Route path="signup" element={<UserAuthForm type="Sign-Up" />} />
          </Route>
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
