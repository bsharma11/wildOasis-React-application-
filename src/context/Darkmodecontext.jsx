import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkmodeContext = createContext();

function DarkmodeProvider({ children }) {
  const [isDarkmode, setisDarkmode] = useLocalStorageState(false, "isDarkmode");

  useEffect(
    function () {
      if (isDarkmode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkmode]
  );

  function ToggledarkMode() {
    setisDarkmode((isDark) => !isDark);
  }
  return (
    <DarkmodeContext.Provider value={{ isDarkmode, ToggledarkMode }}>
      {children}
    </DarkmodeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkmodeContext);
  if (context === undefined)
    throw new Error("Darkmode Context was used outside of the provider");
  return context;
}

export { useDarkMode, DarkmodeProvider };
