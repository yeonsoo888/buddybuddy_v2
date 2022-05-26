import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router'
import { RootState } from '../redux/store';
import io from 'socket.io-client';
const socket = io();

const ChatView = () => {
    const params:{number:string} = useParams();
    const history = useHistory();
    const member:any = useSelector((store:RootState) => store.memberReducer.member);

    const elTxtArea = useRef<HTMLTextAreaElement>(null);

    const [chatList,setChatList] = useState([
        {
            id: null,
            message: null,
        }
    ])
    // const currentRommId = params.number.substring(1);
    
    useEffect(() => {
        // socket.emit('join',currentRommId);
        socket.emit('join','test1');
        console.log("시작2");
        return () => {
            console.log("끝2");
        }
    },[]);

    type Data = {
        id: string,
        message: string
    }
    const sendMessage = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data:Data = {
            id: member.id,
            message: elTxtArea.current!.value
        }
        socket.emit(`test1_send`,data);
        // socket.emit(`${currentRommId}_send`,data);
    }
    
    socket.on('broadcast',(data) => {
        console.log('몇번됐냐??');
        const getNewChatList = [...chatList,{id: data.id,message:data.message}];
        setChatList(getNewChatList);
    })
    
    

    return (
        <>
            <div className=''>
                <ul>
                    {
                        chatList.map((item,i) => {
                            return (
                                <li key={i}>
                                    {item.message}
                                </li>
                            )
                        })
                    }
                </ul>
                <form onSubmit={(e) => {
                    sendMessage(e);
                }}>
                    <textarea name="" ref={elTxtArea}></textarea>
                    <button>메세지 보내기</button>
                </form>
            </div>
            <button onClick={() => {history.push("/")}}>방 목록으로</button>
        </>
    )
}

export default ChatView