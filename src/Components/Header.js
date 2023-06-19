import AccountCircle  from './AccountCircle';
import React from 'react'
import Logo from '../wpstest.png'
const Header = () => {
  return (
    <div className='header'>
        <div className='logo'>
    <img className='logo-img' src={Logo} style={{width:'230px',height:'50px', borderRadius: '5px' }}/>
        </div> 
        <div className='user-icon'>
           <AccountCircle/>
        </div>
    </div>
  )
}

export default Header