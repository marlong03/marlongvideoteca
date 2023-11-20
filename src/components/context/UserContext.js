import React, { useState  } from "react";

const Context = React.createContext({});

/**
 * Context con la información del usuario y el jwt
 * @param {*} param0 
 * @returns Context.Provider
 */
export function UserContextProvider({ children }) {
  const [jwt, setJWT] = useState(
    () => window.localStorage.getItem("access_token")
  )
  const [user, setUSER] = useState(
    () => JSON.parse(window.localStorage.getItem("user"))
  )

  return <Context.Provider value={{
        jwt,
        user,
        setJWT,
        setUSER,
      }}>
      {children}
    </Context.Provider>
}

export default Context
