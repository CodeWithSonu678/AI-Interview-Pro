import { createContext, useState,useEffect } from 'react';
import { getMe } from './services/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  //jb component render hota hai toh yee ek bar chlega kyunki empty array diye hain. 
  useEffect(() => {

    const fetchData = async () => {
      try {

        const data = await getMe();
        setUser(data.user)
        
      } catch (error) {
        setUser(null);
      }finally{
        setAuthLoading(false);
      }
    }

    fetchData();

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser,authLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
