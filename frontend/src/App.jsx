import { RouterProvider } from "react-router"
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from './features/interview/interview.content.jsx'
import Loader from "./features/auth/components/Loader/Loader.jsx";

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <Loader />
        <RouterProvider router={router} />
      </InterviewProvider>

    </AuthProvider>
  );
}

export default App;