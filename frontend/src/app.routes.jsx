import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Home from "./features/interview/pages/Home.jsx";
import Protected from './features/auth/components/Protected.jsx';
import Features from './features/interview/pages/Features.jsx'
import Pricing from './features/interview/pages/Pricing.jsx'
import FAQ from './features/interview/pages/FAQ.jsx'
import HowItWork from './features/interview/pages/HowItWork.jsx'
import RootLayout from './RootLayout.jsx'
import InterviewView from './features/interview/pages/InterviewView.jsx'

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: "/pricing",
                element: <Pricing />
            },
            {
                path: "/features",
                element: <Features />
            },
            {
                path: "/faq",
                element: <FAQ />
            },
            {
                path: "/how-it-work",
                element: <HowItWork />
            },
            {
                path: "/",
                element: <Protected><Home /></Protected>
            },
            {
                path: "/interview/:interviewId",
                element: <Protected><InterviewView /></Protected>
            },
        ]
    }
]);