import React, { useContext } from 'react'
import { Check, Currency } from 'lucide-react'
import '../../styles/Pricing/PricingContainer.scss'
import { pricingPlans } from '../../Data/PricingData'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { createOrder, verifyPaymentApi } from '../../services/payment.api'
import toast from 'react-hot-toast'
import { getMe } from '../../../auth/services/auth.api'
import { AuthContext } from '../../../auth/auth.context'

const PricingContainer = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()

    const { setUser } = useContext(AuthContext);

    //payment handler code here 
    const handlePayment = async (plan) => {

        try {
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

                modal: {
                    ondismiss: function () {
                        toast("Payment cancelled");
                    }
                },

                handler: async function (response) {

                    try {
                        const data = await verifyPaymentApi(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, plan);

                        if (!data.success) {
                            toast.error(data.message);
                            return;
                        }

                        setUser(data.user)

                        toast.success("Plan upgraded successfully.");
                        navigate("/");

                    } catch (error) {
                        toast.error("Payment verification failed.");

                        console.log(error);
                    }

                }
            }

            const razorpay = new window.Razorpay(options);

            razorpay.on("payment.failed", function (response) {

                toast.error("Payment Failed");

                console.log(response.error);

            });

            razorpay.open();
        } catch (error) {
            toast.error("Unable to start payment.");

            console.log(error);
        }

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
