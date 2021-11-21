import axios from 'axios';
import Link from 'next/link';
import router from 'next/router';
import React, { ReactComponentElement, ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserState } from '../store/user/selectors';
import { useDispatch } from 'react-redux';
import { setHospitalId, storelogout } from '../store/user/actions';

interface Props {
  system?: boolean
}

Navbar.defaultProps = {
  system: false
};

function Navbar(props: Props): ReactElement {
  const { system } = props
  const [menuShow, setmenuShow] = useState<Boolean>(false);
  const [navItemUI, setNavItemUI] = useState(<></>);
  const dispatch = useDispatch()
  const toggleMenu = () => {
    setmenuShow(!menuShow)
  }

  // NavItem depend on role
  const userData = useSelector(getUserState);
  const returnSys = () => {
    dispatch(setHospitalId(undefined))
    router.replace('/hospital')
  }
  
  const NavItem = () => {
    if(userData.userinfo && typeof(userData.userinfo.hospitalId) === 'string'){
      let navBackToSys
      if(userData.userinfo.role === 'system_admin'){
        navBackToSys = (
          <a
            id="back-to-system"
            className="tw-w-full sm:tw-w-auto tw-transition tw-duration-500 tw-ease-in-out hover:tw-bg-charcoal hover:tw-text-white tw-py-3 tw-px-2 tw-rounded-lg sm:tw-ml-3"
            onClick={ returnSys }
          >
            Back to system
          </a>
        )
      }
      return (
        <React.Fragment>
          { navBackToSys }
          <Link href="/hospital/resource">
            <a id="resource" className="tw-w-full sm:tw-w-auto tw-transition tw-duration-500 tw-ease-in-out hover:tw-bg-charcoal hover:tw-text-white tw-py-3 tw-px-2 tw-rounded-lg sm:tw-ml-3">Resource</a>
          </Link>
          <Link href="/hospital/patient">
            <a id="patient" className="tw-w-full sm:tw-w-auto tw-transition tw-duration-500 tw-ease-in-out hover:tw-bg-charcoal hover:tw-text-white tw-py-3 tw-px-2 tw-rounded-lg sm:tw-ml-3">Patient</a>
          </Link>
        </React.Fragment>
      )
    }
    else{
      return (
        <></>
      )
    }
  }
  useEffect(() => {
    setNavItemUI(NavItem())
  }, [userData])

  // logout
  const logout = async () =>{
    await axios.get(`${process.env.NEXT_PUBLIC_APP_API}/logout`)
    dispatch(storelogout())
  }
  const HospitalMenu = () => {
    return (
      <React.Fragment>
        <div className={`sm:tw-hidden tw-flex tw-items-center tw-col-span-1 tw-justify-end ${menuShow? 'tw-text-white':''}`} onClick={() => toggleMenu()}>
          <RenderMenuIcon />
        </div>
        <div className={`sm:tw-flex tw-items-center tw-text-lg tw-justify-end tw-transition-all tw-ease-out tw-duration-500 ${menuShow? 'tw-flex tw-flex-col tw-col-span-2 tw-mt-3':'tw-hidden'}`}>
          { navItemUI }
          <a id="logout" onClick={ () => { logout() }} className="tw-w-full sm:tw-w-auto tw-transition tw-duration-500 tw-ease-in-out hover:tw-bg-red-500 hover:tw-text-white tw-py-3 tw-px-2 tw-rounded-lg sm:tw-ml-3 tw-text-red-500 tw-flex tw-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6 tw-inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </a>
        </div>
      </React.Fragment>
    )
  }

  // logo router
  const goToHome = () => {
    if(userData.userinfo && typeof(userData.userinfo.hospitalId) === 'string'){
      if(userData.userinfo.role === 'system_admin' && userData.userinfo.hospitalId === undefined)
        router.push('/system')
      else
        router.push('/hospital')
    }
  }

  const RenderMenuIcon = () => {
    if(menuShow === false)
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    else
      return(
        <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
  }

  return (
    <div className="tw-text-dark-matcha-green tw-bg-dark-green tw-p-3 tw-flex tw-items-center tw-grid tw-grid-cols-2">
      <div className="tw-col-span-1">
        <h1 className="tw-text-dark-matcha-green tw-font-bold tw-text-2xl tw-italic tw-cursor-pointer" onClick={() => {goToHome()}}>COVID-19</h1>
        <h3 className="tw-text-dark-matcha-green tw-font-bold tw-text tw-cursor-pointer" onClick={() => {goToHome()}}>Manage hospital resouce</h3>
      </div>
      <HospitalMenu />
    </div>
  )
}

export default Navbar
