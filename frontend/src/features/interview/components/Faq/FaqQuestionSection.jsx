import React,{useState} from 'react'
import {Minus,Plus} from 'lucide-react'
import {faqData} from '../../Data/FAQ'
import '../../styles/Faq/FaqQuestionSection.scss'
import {useTranslation} from 'react-i18next'

const FaqQuestionSection = () => {

    const {t} = useTranslation();

    const [openId, setOpenId] = useState(null)

    return (
        <div className='faq-question-container'>

            {
                faqData.map(faq => {

                    return (
                            <div className="faq-item" key={faq.id}>
                                <div className="faq-question" onClick={() => setOpenId((openId === faq.id) ? null : faq.id)}>
                                    {openId === faq.id ? <Minus size={21}/> : <Plus size={21}/>}
                                    <h2>{t(faq.question)}</h2>
                                </div>

                                {openId === faq.id &&(
                                    <p className='faq-answer'><span>{t("faq.answer")} :</span> {t(faq.answer)}</p>
                                )}
                            </div>
                    )

                })
            }

        </div>
    )
}

export default FaqQuestionSection
