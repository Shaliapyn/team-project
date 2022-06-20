import { ImProfile } from 'react-icons/im'
import { FaUserTie } from 'react-icons/fa'
import { RiUserStarFill } from 'react-icons/ri'
import { HiUserGroup } from 'react-icons/hi'

export const SidebarData = [
  {
    title: 'Profile',
    link: 'auth/profile',
    icon: <ImProfile size={30} />,
    rolesAccess: ['user', 'manager', 'admin']
  },
  {
    title: 'Member List',
    link: 'auth/member-list',
    icon: <HiUserGroup size={30} />,
    rolesAccess: ['user']
  },
  {
    title: 'Member Management',
    link: 'auth/member-management',
    icon: <FaUserTie size={30} />,
    rolesAccess: ['manager', 'admin']
  },
  {
    title: 'Manager Management',
    link: 'auth/manager-management',
    icon: <RiUserStarFill size={30} />,
    rolesAccess: ['admin']
  },
  {
    title: 'Event List',
    link: 'auth/event-list',
    rolesAccess: ['user', 'manager', 'admin'],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill="currentColor"
        className="bi bi-calendar-week"
        viewBox="0 0 16 16"
      >
        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
      </svg>
    ),
  },
  {
    title: 'Event Management',
    link: 'auth/event-management',
    rolesAccess: ['manager', 'admin'],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill="currentColor"
        className="bi bi-calendar-plus"
        viewBox="0 0 16 16"
      >
        <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
      </svg>
    ),
  },
]
