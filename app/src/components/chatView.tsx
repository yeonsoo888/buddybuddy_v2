import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { RootState } from '../redux/store';
import io from 'socket.io-client';
const socket = io();

const ChatView = () => {
    const params:{number:string} = useParams();
    const history = useHistory();
    const member:any = useSelector((store:RootState) => store.memberReducer.member);

    const elTxtArea = useRef<HTMLTextAreaElement>(null);

    const [chatList,setChatList] = useState<any>([])
    const currentRommId = params.number.substring(1);
    

    type Data = {
        id: string,
        name: string,
        message: string
    }

    useEffect(() => {
        socket.connect();
        socket.emit('join',currentRommId);
        const joinData:Data = {
            id: member.id,
            name: member.name,
            message: `${member.name}님이 입장하셨습니다.`
        }
        socket.emit(`${currentRommId}_join`,joinData);

        return () => {
            socket.disconnect();
        }
    },[]);


    const sendMessage = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data:Data = {
            id: member.id,
            name: member.name,
            message: elTxtArea.current!.value
        }
        socket.emit(`${currentRommId}_send`,data);
        elTxtArea.current!.value = "";
    }
    
    socket.on('broadcast',(data) => {
        const getNewChatList = [...chatList,{id: data.id,name: data.name,message:data.message}];
        getNewChatList.map((item:any) => {
            if(item.id === member.id) {
                item.class = "right"
            }else {
                item.class = "left"
            }
        })
        setChatList(getNewChatList);
    })
    

    return (
        <>
            <div className='chatView'>
                <ul className='chatList'>
                    {
                        chatList.map((item:any,i:number) => {
                            if(chatList !== null) {
                                return (
                                    <li key={i} className={item.class}>
                                        <div className='messageInner'>
                                            <strong>{item.name}</strong>
                                            <p>{item.message}</p>
                                        </div>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                <form onSubmit={(e) => {
                    sendMessage(e);
                }}>
                    <div className='form__inner'>
                        <textarea name="" ref={elTxtArea}></textarea>
                        <button>SEND</button>
                    </div>
                </form>
            </div>
            <div className="btnListWrap">
                <button className='btnList' onClick={() => {history.push("/")}}>방 목록으로</button>
            </div>
        </>
    )
}

export default ChatView