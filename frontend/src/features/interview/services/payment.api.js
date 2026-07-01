import axios from 'axios';

const api = axios.create({
    baseURL:"https://ai-interview-pro-x39z.onrender.com",
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
