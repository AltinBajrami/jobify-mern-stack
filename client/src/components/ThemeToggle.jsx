import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import Wrapper from '../assets/wrappers/ThemeToggle';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
const ThemeToggle = () => {
    const { toggleDarkTheme, isDarkTheme } = useDashboardContext();
    return (
        <Wrapper onClick={toggleDarkTheme}>
            {isDarkTheme ? <BsFillSunFill className="toggle-icon" />
                : <BsFillMoonFill className="toggle-icon" />}
        </Wrapper>
    )
}

export default ThemeToggle