import { useContext } from 'react'
import { InterviewThemeContext } from '../../interview.theme.context.jsx'
import { MonitorCog, Sun, Moon } from 'lucide-react'
import '../../styles/Theme/ThemeUi.scss'
import { useTranslation } from 'react-i18next'

const ThemeUi = () => {

    // context api ka data
    const context = useContext(InterviewThemeContext)

    if (!context) {
        return null;
    }
    const { theme, setTheme, isOpenTheme, setIsOpenTheme, fontSize, setFontSize} = context;

    if (!isOpenTheme) {
        return null;
    }

    // i18n ka use Translation ke liye 

    const { i18n } = useTranslation();


    return (

        isOpenTheme && (
            <>

                <div className="theme-overlay" onClick={() => setIsOpenTheme(false)}>
                    <div className='theme-container' onClick={(e) => e.stopPropagation()}>

                        {/* Theme Title code here */}

                        <div className="setting-title">
                            <h2>Appearance</h2>
                            <p>Customize how the app looks.</p>
                        </div>

                        {/* Choose theme option code here */}

                        <div className="theme-setting">
                            <h2>Theme</h2>
                            <p>Choose your preferred theme</p>
                            <div className="choose-container">

                                <div className={`option-card ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")}>
                                    <div className="option-logo"><Sun /></div>
                                    <p>Light</p>
                                </div>
                                <div className={`option-card ${theme === "dark" ? "active" : ""
                                    }`} onClick={() => setTheme("dark")}>

                                    <div className="option-logo"><Moon /></div>
                                    <p>Dark</p>
                                </div>
                                <div className={`option-card ${theme === "system" ? "active" : ""}`} onClick={() => setTheme("system")}>
                                    <div className="option-logo"><MonitorCog /></div>
                                    <p>System</p>
                                </div>
                            </div>
                        </div>

                        {/* Other Settings code here */}
                        <div className="other-settings">
                            <h2>Other Settings</h2>
                            <div className="otherS-card">
                                <p>Font Size</p>
                                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="otherS-card">
                                <p>Language</p>
                                <select value={i18n.language} onChange={(e) => { i18n.changeLanguage(e.target.value);
                                    localStorage.setItem("language",e.target.value);
                                 }}>
                                    <option value="en">English</option>
                                    <option value="hi">Hindi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        )

    )
}

export default ThemeUi
