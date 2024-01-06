import { Link } from "react-router-dom";
import AnimationWrapper from "../utils/page-animation";
import { useContext } from "react";
import { userContext } from "../App";
import { removeFromSession } from "../utils/session";

const UserNavigationPanel = () => {
  const { userAuth, setUserAuth } = useContext(userContext);
  const username = userAuth.data.username;

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ token: null });
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50 top-[69px]"
    >
      <div className="bg-white absolute right-0 border border-grey w-60  duration-200">
        <Link
          to="/editor"
          className="flex gap-2 text-dark-grey hover:text-black hover:bg-grey p-3 px-4 block opacity-75 md:hidden pl-8 py-4"
        >
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
        <Link
          to={`/user/${username}`}
          className="text-dark-grey hover:text-black hover:bg-grey p-3 px-4 block opacity-75 md:hidden pl-8 py-4"
        >
          Profile
        </Link>
        <Link
          to="/dashboard/blogs"
          className="text-dark-grey hover:text-black hover:bg-grey p-3 px-4 block opacity-75 md:hidden pl-8 py-4"
        >
          Dashboard
        </Link>
        <Link
          to="/settings/edit-profile"
          className="text-dark-grey hover:text-black hover:bg-grey p-3 px-4 block opacity-75 md:hidden pl-8 py-4"
        >
          Settings
        </Link>

        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4 md:hidden"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
