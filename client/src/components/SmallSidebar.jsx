import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import Wrapper from '../assets/wrappers/SmallSidebar';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useDashboardContext();

    return (
        <Wrapper>
            <div className={`${showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}`}>
                <div className="content">
                    <button className="close-btn" type='button' onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}


export default SmallSidebar