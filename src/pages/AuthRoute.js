import React, { createContext, useState } from 'react'


export const AuthContext = createContext(null)

const useAuth = () => {

  const [currentUser, setCurrentUser] = useState(null);

  const [user, setUser] = useState('false');

    return{
      user, 
      currentUser,
      setCurrentUser,
      
      login(name){
        console.log(name)
        localStorage.setItem(name, true);
        setUser("true");
        
      },
      logout(name){
        console.log(name)
        localStorage.setItem(name, false);
        setUser("false");
        
      }
    }
}

const AuthRoute = ({children}) => {  
  const authUser = useAuth();
  return  (
    <AuthContext.Provider value={authUser}>
        {children}
    </AuthContext.Provider> 
  )
}

export default AuthRoute
