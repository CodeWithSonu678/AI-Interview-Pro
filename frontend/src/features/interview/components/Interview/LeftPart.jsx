import { useState } from 'react'
import { ChevronsLeftRight, MessageSquare, MousePointer2, Sparkles } from 'lucide-react'
import '../../styles/Interview/LeftPart.scss'

const LeftPart = ({ setActiveNav, generateResumePdf, interviewId, report }) => {
    const [active, setActive] = useState('technical');

    const LeftData = [
        {
            id: 'technical',
            icon: ChevronsLeftRight,
            title: "Technical Questions",
            btn: 'technical',
        },
        {
            id: 'behavioral',
            icon: MessageSquare,
            title: "Behavioral Questions",
            btn: 'behavioral',
        },
        {
            id: 'roadmap',
            icon: MousePointer2,
            title: "Road Map",
            btn: 'roadmap',
        },
    ];
    return (
        <>
            <div className="btns">
                <p>Section</p>
                {LeftData.map(item => {
                    let Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`l-btn ${active === item.btn ? "active" : ""
                                }`}
                            onClick={() => {
                                setActiveNav(item.btn)
                                setActive(item.btn);
                            }}
                        >
                            <span className="left-icon">
                                <Icon />
                            </span>

                            <span className="leftBtn-title">
                                {item.title}
                            </span>
                        </button>
                    )
                })}

                <button className='download-btn' onClick={() => generateResumePdf(interviewId)}>
                    <span className="left-icon"><Sparkles color="#ffffff" strokeWidth={1.25} /></span>

                    <span className="leftBtn-title">
                        Download Resume
                    </span>
                </button>
            </div>

        </>

    )
}

export default LeftPart
