import React from 'react'
import FHeroSection from '../components/Features/Features-Hero-Section.jsx'
import AllFeatures from '../components/Features/Features.jsx'
import {featuresData} from '../Data/AllFeatures.jsx'

const Features = () => {
  return (
    <>
      <FHeroSection/>
      <AllFeatures features={featuresData} />
    </>
  )
}

export default Features
