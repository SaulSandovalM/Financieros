import React, { useEffect, useState } from 'react'
import app from '../Firebase'
import Loading from '../components/Loading'

export const Auth = React.createContext()

export const AuthContext = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    app.auth().onAuthStateChanged(function(user) {
      setUsuario(user);
      setShowChild(true);
    })
  }, [])

  if (!showChild) {
    return <Loading/>
  } else {
    return (
      <Auth.Provider value={{ usuario }}>
        {children}
      </Auth.Provider>
    )
  }
}
