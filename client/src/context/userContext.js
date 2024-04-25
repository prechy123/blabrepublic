import { createContext, useContext, useState, useEffect } from "react";
import { currentUser, loginUser, logoutUser, registerUser } from "../services/auth.api";
import { deleteTokenFromLocalStorage, saveTokenToLocalStorage } from "../utility/userUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  

    const login = async (credentials) => {
        try {
          setIsLoading(true);
          const data = await loginUser(credentials)
          if (data.error) {
            throw new Error(data.message);
          }
          setIsLoggedIn(true);
          setUser(data.data.user.user);
          saveTokenToLocalStorage(data.data.user.token);
          setError(null);
          return { success: true}
        } catch (error) {
          setError(error.message);
          return { success: false}
        } finally {
          setIsLoading(false);
        }
    }

    const logout = async () => {
        try {
          setIsLoading(true);
          const data = await logoutUser()
          if (data.error) {
            throw new Error(data.message);
          }
          setIsLoggedIn(false);
          setUser(null);
          setError(null);
          deleteTokenFromLocalStorage('accessToken');
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
    }

    const getCurrentUser = async () => {
      try {
        const user = await currentUser();
        if (!user) {
          setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
        setUser(user.data.user);
        setError(null);
      } catch(err) {
        setIsLoggedIn(false);
      }
    }

    const register = async (credentials) => {
      try {
        setIsLoading(true);
        const data = await registerUser(credentials);
        console.log(data);
        if (data.error) {
          throw new Error(data.message);
        }
        setIsLoading(false);
        setError(null)
        return { success: true}
      } catch(err) {
        setError(err.message);
        return { success: false}
      } 
    }

    useEffect(() => {
      setError(null)
      getCurrentUser();
  }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isLoading, error, login, logout, register, setError }}>
          {children}
        </AuthContext.Provider>
    );
}

export function useAuth () {
    return useContext(AuthContext);
}