import type { NextPage } from 'next'
import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm';
import React, { useEffect } from 'react';
import { getUserState } from '../store/user/selectors';
import { useSelector } from 'react-redux';
import router from 'next/router';
import { Spin } from 'antd';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';

const Login: NextPage = () => {

  // check is already signin?
  const userData = useSelector(getUserState);

  useEffect(() => {
    // check api fetch
    if(userData.loadStatus === true){
      if(userData.login === true && userData.userinfo){
        // redirect...
        if(userData.userinfo.role === 'system_admin'){
          router.push("/system");
        }
        if(userData.userinfo.role === 'hospital'){
          router.push("/hospital");
        }
      }
    }
  }, [userData])

  return (
    <div className="tw-flex tw-flex-col tw-mx-auto tw-w-full md:tw-w-3/4 tw-min-h-screen tw-pt-5">
      <Logo />
      <div className="tw-relative tw-flex tw-flex-col tw-flex-grow">
        <div className="tw-bg-white tw-flex tw-flex-grow tw-flex-col tw-rounded-t-3xl tw-p-5 tw-shadow-top-xl-dark-green">
          <div className="tw-flex tw-flex-row tw-justify-between tw-mb-10">
            <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-dark-green" />
            <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-dark-green" />
          </div>
          <div className="tw-w-5/6 md:tw-w-1/2 tw-mx-auto">
            {
              userData.loadStatus === true?
              <LoginForm />
              :
              <div className="tw-w-full tw-flex tw-justify-center tw-items-center">
                <div>
                  <Spin style={{height: "50px"}} indicator={<LoadingOutlined className="tw-text-charcoal" style={{ fontSize: 50 }} spin />} />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
