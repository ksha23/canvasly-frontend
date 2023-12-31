import Navbar from "../components/Navbar";
import SettingsForm from "../components/SettingsForm";

const SettingsPage = () => {
  return (
    <div className="dark:bg-black dark:text-white">
      <Navbar />
      <div className="p-10 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-md">
          <SettingsForm />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
