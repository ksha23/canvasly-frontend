import Navbar from "../components/Navbar";
import "./Home.css";
import Youtube from "../components/Youtube";
import applyTheme from "../utils/colorThemeHandler";
import Footer from "../components/Footer";

const HomePage = () => {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      applyTheme(); // Update the theme when the preference changes
    });

  return (
    <div className="flex flex-col dark:bg-black dark:text-white min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-3xl mx-auto text-center p-10 pt-5">
        <h1 className="text-4xl font-bold mb-4">Welcome to CanvasLy</h1>
        <p className="text-lg text-gray-600 mb-8 dark:text-slate-300">
          Empowering Students to Master Their Academic Journey
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            Why Choose CanvasLy?
          </h2>
          <ul className="text-left list-disc ml-6 dark:text-slate-300">
            <li>
              Effortlessly manage upcoming assignments, quizzes, projects, and
              exams
            </li>
            <li>
              Personalize prioritization of assignments based on due date,
              difficulty, and type
            </li>
            <li>Never miss another assignment again!</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            How to Get Started:
          </h2>
          <ol className="text-left list-decimal ml-6 dark:text-slate-300">
            <li>Access "Canvas Calendar" in the Canvas side menu</li>
            <li>Locate "Calendar Feed" and copy the URL</li>
            <li>
              Open Google Calendar and select "+ Other Calendars" then "From
              URL"
            </li>
            <li>Paste the URL and click "Add Calendar"</li>
            <li>Sign in to CanvasLy using your Google account</li>
            <li>Choose the imported Canvas calendar to display assignments</li>
            <li>You're all set!</li>
          </ol>

          <div className="mt-8">
            <div className="video-container">
              <Youtube videoId="5tayaNGT-F4" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
