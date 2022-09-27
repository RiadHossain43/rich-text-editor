import React, { useState } from "react";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Router from "./components/shared/router/Router";
const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <Router />
        <Footer />
      </div>
    </div>
  );
};
export default App;
