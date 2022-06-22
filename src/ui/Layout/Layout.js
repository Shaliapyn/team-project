import { Outlet } from 'react-router-dom'

import Sidebar from 'layout/Sidebar'
import Topbar from 'layout/Topbar'

import styles from 'assets/scss/layout.module.scss'
import { MenuProvider } from 'context/MenuContext'

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <MenuProvider>
        <Sidebar />
        <main className={styles.container}>
          <Topbar />
          <Outlet />
        </main>
      </MenuProvider>
    </div>
  )
}

export default Layout
