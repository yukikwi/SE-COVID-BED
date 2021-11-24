import axios from 'axios';
import React, { ReactChild, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/user/actions';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getUserState } from '../store/user/selectors';

interface Props {
  children: ReactChild
}

function UserStore(props: Props) {
  const { children } = props
  const dispatch = useDispatch();
  const userData = useSelector(getUserState);

  const fetchUser = async () => {
    try{
      const response:any = await axios.get(`${process.env.NEXT_PUBLIC_APP_API}/user/login`)
      if(response.data.userData){
        const userData = response.data.userData
        dispatch(setUser(userData))
      }
    }
    catch(e){
      // not login or cannot contact api
      dispatch(setUser({}))
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if(userData.loadStatus){
    return (
      <div>
        { children }
      </div>
    )
  }
  else{
    const antIcon = <LoadingOutlined className="tw-text-charcoal" style={{ fontSize: 50 }} spin />;
    
    return(
      <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
        <div>
          <Spin style={{height: "50px"}} indicator={antIcon} />
        </div>
      </div>
    )
  }
}

export default UserStore
