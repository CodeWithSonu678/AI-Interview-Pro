import axios from 'axios';

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    // baseURL:"http://localhost:3000",
    withCredentials:true
});


//order cerate api heat 

export const createOrder = async(plan)=>{
    try {
        const res = await api.post('/api/payment/create-order',{plan});

        return res.data
    } catch (error) {
        console.log(error)

        throw error
    }
}

//verify payment 

export const verifyPaymentApi = async(razorpay_order_id, razorpay_payment_id, razorpay_signature, plan)=>{
    try {
        const res = await api.post('/api/payment/verify-payment',{razorpay_order_id, razorpay_payment_id, razorpay_signature, plan});

        return res.data;
    } catch (error) {
        console.log(error)

        throw error
    }
}