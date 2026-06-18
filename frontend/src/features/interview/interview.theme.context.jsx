import { createContext, useState, useEffect } from 'react'

export const InterviewThemeContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme")||"dark")
  const [isOpenTheme, setIsOpenTheme] = useState(false)
  const [fontSize, setFontSize] = useState("Medium")

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute("data-theme", "light");
    }
    else if (theme === 'dark') {
      document.documentElement.setAttribute("data-theme", "dark");

    }
    else{
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      document.documentElement.setAttribute("data-theme", isDark ? "dark":"light");
    }

    localStorage.setItem("theme",theme);

  }, [theme]);


  return (
    <InterviewThemeContext.Provider value={{ theme, setTheme, isOpenTheme, setIsOpenTheme, fontSize, setFontSize }}>
      {children}
    </InterviewThemeContext.Provider>
  )
}

export default InterviewProvider
