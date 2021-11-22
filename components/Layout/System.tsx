import router from 'next/router';
import React, { ReactChild, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserState } from '../../store/user/selectors';
import HospitalNavbar from '../Navbar'

interface Props {
  children: ReactChild,
  button: ReactElement,
  title: string
}

LayoutSystem.defaultProps = {
  button: <></>
}

function LayoutSystem(props: Props): ReactElement {
  const {children, title, button} = props

  // check permission
  const userData = useSelector(getUserState);
  useEffect(() => {
    // check api fetch
    if(userData.loadStatus === true){
      if(userData.login === true && userData.userinfo){
        // redirect...
        if(userData.userinfo.role === 'hospital'){
          router.replace("/hospital");
        }
      }
      else{
        // login before
        router.replace("/login");
      }
    }
  }, [userData])
  

  return (
    <div>
      <HospitalNavbar system/>
      <div className="tw-mx-10 tw-my-5 tw-grid tw-grid-cols-2">
        <div>
          <h1 className="tw-text-charcoal tw-text-3xl tw-font-bold">{ title }</h1>
        </div>
        <div>
          { button }
        </div>

        <div className="tw-bg-white tw-p-5 tw-mt-5 tw-col-span-2 tw-rounded-lg">
          { children }
        </div>
      </div>
    </div>
  )
}

export default LayoutSystem
