import { Outlet } from 'react-router-dom'

import Sidebar from 'layout/Sidebar'
import Topbar from 'layout/Topbar'
import Footer from 'layout/Footer'

import { MenuProvider } from 'context/MenuContext'

const Layout = () => {
  return (
    <div className="w-100 d-flex">
      <MenuProvider>
        <Sidebar />
        <main className="w-100 d-flex flex-column min-vh-100" style={{ backgroundColor: '#f2f8f8' }}>
          <Topbar />
          <Outlet />
          <Footer />
        </main>
      </MenuProvider>
    </div>
  )
}

export default Layout
