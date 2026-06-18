import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import '../../styles/Interview/CenterPart.scss'

const CenterPart = ({ activeNav,report }) => {
  const [openId, setOpenId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)


  return (
    <>

      {/* technical code here */}

      {
        activeNav === 'technical' && (

          <section>
            <div className="title-section">
              <h3>Technical Questions</h3>
              <span>{report.technicalQuestions.length} Questions</span>
            </div>

            <div className="questions-sections">
              {report.technicalQuestions.map((q,i) => {
                return (
                  <div className='q-container'>
                    <div className="question" onClick={() => {
                      setOpenId((openId === i) ? null : i)
                      setIsOpen(!isOpen)
                    }}>
                      <div className='question-left'>
                        <div className='q-no'>Q{i+1}  </div>
                        <p className="question-text">
                          {q.question}
                        </p>
                      </div>
                      <span>{isOpen ? <ChevronUp color="#94a3b8" /> : <ChevronDown size={21} color="#94a3b8" />}</span>
                    </div>
                    {
                      openId === i && (
                        <div className="answer-box">
                          <span className='intention'>INTENTION</span>
                          <p>{q.intention} </p>
                          <span className='model'>MODEL ANSWER</span>
                          <p>{q.answer} </p>
                        </div>
                      )
                    }

                  </div>
                )

              })}
            </div>
          </section>
        )
      }

      {/* behavioral code here */}
      {
        activeNav === 'behavioral' && (
          <section>
            <div className="title-section">
              <h3>Behavioral Questions</h3>
              <span>{report.behavioralQuestions.length} Questions</span>
            </div>

            <div className="questions-sections">
              {report.behavioralQuestions.map((q,i) => {
                return (
                  <div className='q-container'>
                    <div className="question" onClick={() => {
                      setOpenId((openId === i) ? null : i)
                      setIsOpen(!isOpen)
                    }}>
                      <div className='question-left'><div className='q-no'>Q{i}  </div><p className="question-text"> {q.question}</p></div> <span>{isOpen ? <ChevronUp color="#94a3b8" /> : <ChevronDown size={21} color="#94a3b8" />}</span>
                    </div>
                    {
                      openId === i && (
                        <div className="answer-box">
                          <span className='intention'>INTENTION</span>
                          <p>{q.intention} </p>
                          <span className='model'>MODEL ANSWER</span>
                          <p>{q.answer} </p>
                        </div>
                      )
                    }

                  </div>
                )

              })}
            </div>
          </section>
        )
      }

      {/* Road map code here */}
      {
        activeNav === 'roadmap' && (
          <section>
            <div className="title-section timeline-title">
              <h2>Preparation Road Map</h2>
              <span>{report.preparationPlan.length}-day plan</span>
            </div>
            <div className="timeline">
              {
                report.preparationPlan.map(map => {

                  return (
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-heading">
                        <span className='timeline-day'>Day{map.day}</span>
                        <h3 className="topic">{map.focus}</h3>
                      </div>

                      <ul className='topic-list'>
                        {map.tasks.map(i => {
                          return (
                            <li key={i.id}>
                              <span className='li-dot' />
                              {i}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                }
                )
              }

            </div>
          </section>
        )
      }
    </>
  )

}

export default CenterPart
