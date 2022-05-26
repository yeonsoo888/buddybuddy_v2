import React ,{useState , useEffect} from 'react';
import { useHistory } from "react-router";
import { Cookies } from "react-cookie";
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import jwt_decode from "jwt-decode";


import Header from './components/header';
import Login from './components/login';

import './css/style.scss'
import ChatRooms from './components/chatRooms';


const App = ():JSX.Element => {
  const [isLogin,setIsLogin]:any[] = useState(false);
  const history = useHistory()
  const dispatch:Dispatch = useDispatch()
  const cookies = new Cookies();

  useEffect(() => {
    const userCookies:any = cookies.get("user")
    if(userCookies !== undefined) {
      let userInfo:{userId:String,mail:String,level:String} = jwt_decode(userCookies);
      dispatch({type: "loginMember",payload: {
          id: userInfo.userId,
          mail:userInfo.mail,
          level: userInfo.level,
      }});
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    
  },[])

  const authLogout = ():void => {
    setIsLogin(false);
    cookies.remove("user");
    history.push('/');
  }


  return (
    <>
      {
        isLogin 
        ? 
        (
          <div className='contents'>
            <Header authLogout={authLogout} />
            <ChatRooms />
          </div>
        )
        :
        <Login setIsLogin={setIsLogin} />
      }
      
    </>
  );
}

export default App;