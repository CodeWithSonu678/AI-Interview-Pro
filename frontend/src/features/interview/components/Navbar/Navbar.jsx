import { useState, useContext } from 'react';
import { Link } from 'react-router';
import { Sun, Menu, X } from 'lucide-react';
import '../../styles/Navbar/Navbar.scss';
import { InterviewThemeContext } from '../../interview.theme.context.jsx';
import { useTranslation } from 'react-i18next';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const context = useContext(InterviewThemeContext);

    if (!context) return null;

    const { isOpenTheme, setIsOpenTheme } = context;

    const { t } = useTranslation();

    return (
        <nav>

            <div className="logo">
                <div className="logo-title">AI</div>
                <h3 className="logo-text">
                    AI Interview Pro
                </h3>
            </div>

            {/* Mobile Menu Button */}

            <button
                className="menu-btn"
                onClick={() =>
                    setIsMenuOpen(!isMenuOpen)
                }
            >
                {
                    isMenuOpen
                        ? <X size={25} />
                        : <Menu size={25} />
                }
            </button>

            {/* Nav Links */}

            <div
                className={`nav-links ${
                    isMenuOpen ? "active" : ""
                }`}
            >

                <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {t("nav.home")}
                </Link>

                <Link
                    to="/features"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {t("nav.features")}
                </Link>

                <Link
                    to="/how-it-work"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {t("nav.howItWork")}
                </Link>

                <Link
                    to="/pricing"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {t("nav.pricing")}
                </Link>

                <Link
                    to="/faq"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {t("nav.faq")}
                </Link>

                <button
                    className="theme-btn"
                    onClick={() =>
                        setIsOpenTheme(!isOpenTheme)
                    }
                >
                    <Sun size={21} />
                </button>

                <Link
                    to="/login"
                    className="sign-btn"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {t("nav.signIn")}
                </Link>

            </div>

        </nav>
    );
};

export default Navbar;