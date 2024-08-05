import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ isBigSidebar }) => {
    const { toggleSidebar, user } = useDashboardContext();
    return <div className="nav-links">
        {
            links.map(({ text, path, icon }) => {
                if (path === 'admin' && user.role !== 'admin') return;
                return <NavLink key={text} to={path} className={'nav-link'} end
                    onClick={isBigSidebar ? null : toggleSidebar}>
                    <span className='icon'> {icon}</span>
                    {text}
                </NavLink>
            })
        }
    </div>
}

export default NavLinks