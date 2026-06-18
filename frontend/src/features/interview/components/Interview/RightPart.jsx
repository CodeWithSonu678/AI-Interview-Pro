import React from 'react'
import '../../styles/Interview/RightPart.scss'

const RightPart = ({ report }) => {
  return (
    <>
      <p className='label-ms'>MATCH SCORE</p>

      <div className="show-ms">
        <div className="child-ms">{report.matchScore} <span>%</span></div>
        <p>Strong match for this role</p>
      </div>

      <div className="skill-gaps">
        <p>SKILL GAPS</p>

        <div className="gap-list">
          {report.skillGaps.map((gap, i) => (
            <span key={i} className={`${gap.severity}`}>
              {gap.skill}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default RightPart
