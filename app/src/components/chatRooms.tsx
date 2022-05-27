import { useState ,useEffect } from 'react';
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import ChatView from "./chatView";
import { Chatserv } from "../service/chat";


const ChatRooms = ():JSX.Element => {
    const chatRoom = new Chatserv();
    const [chatRommList,setChatRommList] = useState([]);

    useEffect( () => {
        chatRoom.chatServ('get','/chatList')
        .then(response => {
            setChatRommList(response.data);
        });
        
        return () => {
            console.log("끝1");
        }
        

    },[])

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <ul className="chatRomm__list">
                        {
                            chatRommList.map((item:any,i:number):JSX.Element => {
                                return (
                                    <li key={item._id}>
                                        <Link to={`/room/:${item.owner}`}>
                                            <strong>{item.title}</strong>
                                            <span>4인</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Route>
                <Route path="/room/:number">
                    <ChatView />
                </Route>
            </Switch>
        </>
    )
}

export default ChatRooms