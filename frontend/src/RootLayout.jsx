import {Outlet} from 'react-router'
import Navbar from './features/interview/components/Navbar/Navbar'
import Footer from './features/interview/components/footer/footer'
import ThemeUi from './features/interview/components/Theme/ThemeUi'

const RootLayout = () => {
  return (
    <>
      <Navbar/>
      <ThemeUi/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default RootLayout
