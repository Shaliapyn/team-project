import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

import { Route, Routes } from 'react-router-dom'

import Layout from './ui/Layout'
import Start from './pages/Start'
import Profile from './pages/Profile'
import MemberList from './pages/MemberList'
import MemberManagement from './pages/MemberManagement'
import EventList from './pages/EventList'
import EventManagement from './pages/EventManagement'
import Event from './pages/Event'
import ManagerManagement from './pages/ManagerManagement'
import Login from './pages/Login'
import Home from './pages/Home'
import RequireAuth from './hoc/RequireAuth'
import GetState from './hoc/GetState'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Start />} />
          <Route path="signin" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="auth/*"
            element={
              <GetState>
                <RequireAuth>
                  <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="member-list" element={<MemberList />} />
                    <Route path="member-management" element={<MemberManagement />} />
                    <Route path="manager-management" element={<ManagerManagement />} />
                    <Route exact path="event-list" element={<EventList />} />
                    <Route exact path="event-management" element={<EventManagement />} />
                    <Route path="event-management/event" element={<Event />} />
                  </Routes>
                </RequireAuth>
              </GetState>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
