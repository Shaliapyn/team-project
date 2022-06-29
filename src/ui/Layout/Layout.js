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
        <main className="bg-light w-100 d-flex flex-column min-vh-100">
          <Topbar />
          <Outlet />
          <Footer />
        </main>
      </MenuProvider>
    </div>
  )
}

export default Layout
