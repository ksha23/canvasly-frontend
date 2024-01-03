import { useEffect } from "react";

import { useNavigate, Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RESET, GET_CALENDAR_DATA } from "../redux/constant";
import { setIsLoggedIn } from "../redux/actions/loginActions";
import { fetchUserData } from "../redux/actions/userActions";
import { getAssignments } from "../redux/actions/assignmentListActions";

const Navbar = () => {
  var userData = useSelector((state) => state.userDataReducer);
  var isLoggedIn = useSelector((state) => state.loginStateReducer);
  var calendarData = useSelector((state) => state.calendarDataReducer);
  var assignments = useSelector((state) => state.assignmentsListReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn == false || userData == {}) dispatch(fetchUserData());

    if (isLoggedIn && !userData) dispatch(fetchUserData());

    if (isLoggedIn && calendarData.length == 0)
      dispatch({ type: GET_CALENDAR_DATA });

    if (isLoggedIn && assignments.length == 0) dispatch(getAssignments());
  }, [isLoggedIn]);

  // ------------------ Navbar ----------------------

  const isActiveLink = (pathname) => {
    return location.pathname === pathname ? "font-bold" : "";
  };

  // ------------------ Authentication --------------

  async function auth() {
    window.open(`${process.env.REACT_APP_API_URL}/api/v1/auth/google`, "_self");
  }

  async function logout() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/logout`,
      {
        method: "get",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data.message === "Successfully logged out") {
      dispatch(setIsLoggedIn(false));
      dispatch({ type: RESET });
      navigate("/");
    }
  }

  return (
    <header className="bg-blue-500 py-4 px-6">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className={
              isActiveLink("/") + " text-white text-s md:text-base lg:text-base"
            }
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/assignments"
              className={
                isActiveLink("/assignments") +
                " text-white text-s md:text-base lg:text-base"
              }
            >
              Assignments
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/settings"
              className={
                isActiveLink("/settings") +
                " text-white text-s md:text-base lg:text-base"
              }
            >
              Settings
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <div className="user-profile">
            {isLoggedIn && userData && (
              <img
                className="h-8 w-8 rounded-full"
                src={userData.photo}
                alt="Profile"
              />
            )}
          </div>
          {!isLoggedIn && (
            <button className="px-1 py-1 rounded-md" onClick={() => auth()}>
              <img
                className="h-5 md:h-8"
                src={process.env.PUBLIC_URL + "/sign-in2.png"}
                alt="Sign In"
              />
            </button>
          )}
          {isLoggedIn && (
            <button
              className="rounded-md text-white text-sm pl-2"
              onClick={() => logout()}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
