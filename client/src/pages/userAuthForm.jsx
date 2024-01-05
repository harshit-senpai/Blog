import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "./../assets/images/googleIcon.png";
import AnimationWrapper from "../utils/page-animation";
import { useContext, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { sotreInSession } from "../utils/session";
import { userContext } from "../App";

const UserAuthForm = ({ type }) => {
  let {
    userAuth: { token },
    setUserAuth,
  } = useContext(userContext);

  console.log(token);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post("http://localhost:4000/api/users" + serverRoute, formData)
      .then(({ data }) => {
        sotreInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
        console.log(import.meta.env.VITE_SERVER_DOMAIN);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "Sign-In" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let form = new FormData(formElement);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Full Name must be at least 3 characters");
      }
    }
    if (!email.length) {
      return toast.error("Please enter a email address");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be at least of 6 to 20 characters long with 1 numeric, 1 lowercase and 1 Uppercase character"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper KeyValue={type}>
      <div className="py-4 px-[5vw] md:px-[7vw] lg:px-[10vw] min-h-[calc(100vh-80px)] flex items-center justify-center">
        <form id="formElement" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "signin" ? "Welcome back" : "join us today"}
          </h1>

          {type != "Sign-In" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-at"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />

          <button
            className="whitespace-nowrap bg-black text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80 block mx-auto mt-14"
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="whitespace-nowrap bg-black text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80 flex items-center justify-center gap-4 w-[90%] block mx-auto">
            <img src={googleIcon} alt="google icon" className="w-6" />
            Continue with Google
          </button>

          {type === "Sign-In" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don`t have an account?{" "}
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign In here
              </Link>
            </p>
          )}
        </form>
      </div>
      <Toaster />
    </AnimationWrapper>
  );
};

export default UserAuthForm;
