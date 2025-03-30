// for login authentication throughout the app 
// centralized state to maintain user state in one place 

"use client"; 
import { createContext, useContext, useState, useEffect, ReactNode } from "react"; 
import { publicUserData } from "@/schemas/user.schema";

interface UserContextType {
  user: publicUserData | null; 
  login: (email: string, password: string) => Promise<void>; 
  logout: () => Promise<void>; 
}

const UserContext = createContext<UserContextType | undefined>(undefined); 

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<publicUserData | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user'); 
      return storedUser ? JSON.parse(storedUser) : null; 
    }
    return null; 
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ email, password }), 
      });
      const data = await response.json(); 
      if (!response.ok) {
        throw new Error('Failed to login'); 
      }
      setUser(data); 

      localStorage.setItem('user', JSON.stringify(data)); 
      
    } catch (error) {
      throw new Error('Failed to login'); 
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');;
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
  
}


export const useUser = () => {
  const context = useContext(UserContext); 
  if (!context) {
    throw new Error('useUser must be used within a UserProvider'); 
  }
  return context; 
};




