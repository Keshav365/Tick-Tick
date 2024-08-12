import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  
  const login = async (inputs) => {
    
    try{
      const res = await axios.post("http://localhost:8081/auths/login", inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    }catch(err){
      console.log(err);
    }
  };

  const logout = async () => {
    try{
    await axios.post("http://localhost:8081/auths/logout", {}, { withCredentials: true });
    setCurrentUser(null);
    window.location.href = '/login';
    console.log("Loging out bitch!!");
    localStorage.removeItem("user");}
    catch(err){
      console.log(err);
    }
    
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
