import React from 'react'
import {Copyright} from 'lucide-react'
import { Link } from 'react-router';
import '../../styles/Footer/Footer.scss'
import {useTranslation} from 'react-i18next'

const Footer = () => {

  const {t} = useTranslation();
  return (
    <footer className='footer'>
        <div className='footer-link'>
            <Link to="/privacy-policy">{t("footer.privacy")}</Link>
            <Link to="/terms-of-service">{t("footer.terms")}</Link>
            <Link to="/help-center">{t("footer.help")}</Link>
        </div>
        <p className='para'> <Copyright size={18}/> {t("footer.copyright")}</p>
    </footer>

  )
}

export default Footer
