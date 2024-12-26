import React, { useState, useEffect } from 'react';
import ChatList from '../Components/Chats/Chatlist'
import './Page.scss';

function Home() {
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [data, setData] = useState([]);
    const chatData = [
        { name: "User1", type: true, content: "Hello, how are you?" },
        { name: "User2", type: false, content: "I'm good, thanks!" },
        { name: "User2", type: false, content: "I'm good, thanks!" },
        { name: "User1", type: true, content: "Great to hear!" },
        { name: "User3", type: false, content: "I'm good, thanks!" },
        { name: "User4", type: false, content: "I'm good, thanks!" },
        { name: "User2", type: false, content: "I'm good, thanks!" },
        { name: "User6", type: false, content: "I'm good, thanks!" },
    ];
    // 체크: 화면 크기에 따라 상태 업데이트
    useEffect(() => {

    }, []);

    return (
        <div className="MainContainer">
            <div className="ChatPage">
                <div className="ChatListContainer">
                    <ChatList data={chatData} />
                </div>
            </div>
        </div>
    );
}

export default Home;
