import React, {  useRef , useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Cookies } from "react-cookie";
import { Member } from '../service/auth';

type appProps = {
    setIsLogin : (a:Boolean) => void
}

export default function Login(props:appProps):JSX.Element {
    const path = process.env.PUBLIC_URL;

    const dispatch:Dispatch = useDispatch()
    const inputMail = useRef<HTMLInputElement>(null);
    const inputPw = useRef<HTMLInputElement>(null);

    const [correctId,setCorrectId] = useState(true);
    const member = new Member();
    const cookies = new Cookies();

    let mailValue:String;
    let pwValue:String;
    
    let now = new Date();
    let after1m = new Date();

    const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        after1m.setMinutes(now.getMinutes() + 60);
        if(inputMail.current !== null) {
            mailValue = inputMail.current.value;    
        }
        
        if(inputPw.current !== null) {
            pwValue = inputPw.current.value;
        }

        member.member('post','/login',{
            mail: mailValue,
            pw : pwValue,
        })
        .then((res:any) => {
            const token = res.data;
            cookies.set("user",token,{
                expires: after1m,
            });
            let userInfo:{userId:String,mail:String,level:String} = jwt_decode(token);
            dispatch({type: "loginMember",payload: {
                id: userInfo.userId,
                mail:userInfo.mail,
                level: userInfo.level,
            }});
            props.setIsLogin(true);
            setCorrectId(true);
            console.log(res);
        })
        .catch((err:any) => {
            setCorrectId(false);
            setTimeout(() => {
                setCorrectId(true);
            },1500)
        });
    }
    
    return (
        <div>
            <div className='loginToo'>
                <span>버디버디 v2</span>
                <p>X</p>
            </div>
            <div className='loginModal'>
                <img src={`${path}/images/login_bg.jpg`} className="topImg" alt="" />
                <form onSubmit={handleLogin}>
                    <div className='formInner'>
                        <div>
                            <label>
                                <span>이용자 ID</span>
                                <input type="text" name="" ref={inputMail} />
                            </label>
                            <label>
                                <span>비밀번호</span>
                                <input type="password" name="" ref={inputPw} />
                            </label>
                        </div>
                        <button>
                            로그인
                        </button>
                    </div>
                </form>
                <a className='loginLink' href="https://github.com/yeonsoo888/buddybuddy_v2" target="_blank">https://github.com/yeonsoo888/buddybuddy_v2</a>
            </div>
        </div>
    )
}