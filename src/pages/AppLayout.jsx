import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import User from '../components/User'

import { useAuth } from '../contexts/useAuth'

import styles from './AppLayout.module.css'

const AppLayout = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuthenticated && <User />}
    </div>
  )
}

export default AppLayout
