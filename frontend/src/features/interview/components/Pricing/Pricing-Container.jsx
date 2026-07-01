import React from 'react'
import { Check, Currency } from 'lucide-react'
import '../../styles/Pricing/PricingContainer.scss'
import { pricingPlans } from '../../Data/PricingData'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { createOrder } from '../../services/payment.api'

const PricingContainer = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()

    //payment handler code here 
    const handlePayment = async (plan) => {

        if (plan === 'free') {
            navigate('/')
            return;
        }

        const { order } = await createOrder(plan);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,

            amount: order.amount,

            currency: order.currency,

            name: "AI Interview Pro",

            description: `${plan} Plan`,

            order_id: order.id,

            handler: function (response) {

                console.log(response);

            }
        }

        const razorpay = new window.Razorpay(options);

        razorpay.open();
    }


    return (
        <div className='pricing-container'>

            {pricingPlans.map((plan) => (
                <div className={`card ${plan.type}`} key={plan.id}>

                    {plan.isPopular && (
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

                    <button onClick={() => handlePayment(plan.type)} > {t(plan.button)}</button>
                </div>
            ))}

        </div>
    )
}

export default PricingContainer
