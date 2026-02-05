import { useContext } from 'react'
import { AuthContext } from './FakeAuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('AuthContext was used outside AuthProvider')
  }
  return context
}
