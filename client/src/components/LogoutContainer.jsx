import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/LogoutContainer'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { toggleDarkTheme, user, logoutUser } = useDashboardContext();


    return (
        <Wrapper>
            <button type='button' className='btn logout-btn' onClick={() => setShowLogout(!showLogout)}>
                {user.avatar ? <img src={user.avatar} alt='avatar' className='img' /> :
                    <FaUserCircle />
                }
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={`${showLogout ? 'dropdown show-dropdown' : 'dropdown'}`}>
                <button type='button' className='dropdown-btn' onClick={logoutUser}>logout</button>
            </div>
        </Wrapper>
    )
}

// const Wrapper = styled.div`
//     .dropdown{
//         display: none;
//         position: relative;
//     }
//     .logout-btn{
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//     }
//     .show-dropdown{
//         display: block;
//     }
//     .dropdown-btn{
//         position: absolute;
//         width: 100%;
//         background-color: var(--primary-400);
//         color: aliceblue;
//         text-transform:capitalize;
//         margin-top: 1rem;
//         border: transparent;
//         padding: 0.5rem ;
//         border-radius: var(--border-radius);
//         transition: var(--transition);
//     }
//     .dropdown-btn:hover{
//         background-color: var(--primary-700);
//     }
// `

export default LogoutContainer