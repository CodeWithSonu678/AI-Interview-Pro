import React from 'react'
import { Check } from 'lucide-react'
import '../../styles/Pricing/PricingContainer.scss'
import { pricingPlans } from '../../Data/PricingData'
import {useTranslation} from 'react-i18next'

const PricingContainer = () => {
    const {t} = useTranslation();
    return (
        <div className='pricing-container'>

            {pricingPlans.map((plan) => (
                <div className={`card ${plan.type}`} key={plan.id}>

                    { plan.isPopular && (
                        <span className='badge'>{t("pricing.mostPopular")}</span>
                    )}

                    <h2>{t(plan.title)}</h2>

                    <p className="sub-title">{t(plan.subtitle)}</p>

                    <p className="price-title">
                        <span>{t(plan.price)}</span> /month
                    </p>

                    {plan.features.map((feature, index) => (
                        <p key={index} className="feature-provide">
                            <Check strokeWidth={1.25} />
                            {t(feature)}
                        </p>
                    ))}

                    <button>{t(plan.button)}</button>
                </div>
            ))}

        </div>
    )
}

export default PricingContainer
