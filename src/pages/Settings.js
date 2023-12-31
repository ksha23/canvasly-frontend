import { useEffect } from "react";
import Navbar from "../components/Navbar";

import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../redux/actions/userActions";
import { GET_CALENDAR_DATA } from "../redux/constant";

import SettingsForm from "../components/SettingsForm";

const SettingsPage = () => {
  const dispatch = useDispatch();
  // Get user data and calendars from redux store
  var userData = useSelector((state) => state.userDataReducer);
  var calendarData = useSelector((state) => state.calendarDataReducer);

  // ------------------ Page Load ----------------------

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch({ type: GET_CALENDAR_DATA });
  }, [dispatch]);

  // ------------------ Render ----------------------

  return (
    <div className="dark:bg-black dark:text-white">
      <Navbar />
      <div className="p-10 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        {userData && calendarData && (
          <div className="bg-zinc-200 dark:bg-zinc-800 p-6 rounded-md">
            <SettingsForm calendarData={calendarData} userData={userData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
