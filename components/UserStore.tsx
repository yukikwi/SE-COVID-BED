import axios from 'axios';
import React, { ReactChild, ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user/actions';

interface Props {
  children: ReactChild
}

function UserStore(props: Props) {
  const { children } = props
  const dispatch = useDispatch();

  const fetchUser = () => {
    axios.get(`${process.env.NEXT_PUBLIC_APP_API}/login`).then((response:any) => {
      if(response.data.userData){
        const userData = response.data.userData
        dispatch(setUser(userData))
      }
    }).catch(function (error) {
      // not login
    })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      { children }
    </div>
  )
}

export default UserStore
