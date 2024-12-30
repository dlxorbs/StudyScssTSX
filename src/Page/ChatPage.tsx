import React, { useState, useEffect } from "react";
import ChatList from "../Components/Chats/Chatlist";
import TextInput from "../Components/Inputs/TextInput";
import { db } from "../firebase";
import "./Page.scss";

// 메시지 타입 정의
interface Message {
    name: string;
    type: boolean;
    content: string;
}

function Home() {
    const [isLargeScreen, setIsLargeScreen] = useState(false); // 화면 크기 상태
    const [data, setData] = useState<Message[]>([]); // 채팅 데이터 상태
    const [value, setValue] = useState(""); // 입력값 상태

    // 화면 크기 체크: 화면 크기 변화 감지
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    // 데이터 긁어오기 및 넣기

    useEffect(() => {
        let Datas = {};
        // console.log(db.collection('chat').doc())
    })

    useEffect(() => {
        const chatscroll = document.querySelector('.ChatListContainer') as HTMLElement;
        const chatlist = document.querySelector('.chatlist') as HTMLElement;
        const scrollHeight = chatlist?.offsetHeight;
        chatscroll?.scrollTo({
            top: scrollHeight + 140,
        })
        console.log(scrollHeight)
    })


    const handleSendMessage = () => {
        if (value.trim()) {
            // 여기 공부하기
            const newMessage: Message = { name: "User", type: true, content: value };
            setData([...data, newMessage]);
            setValue("");
        }

    };

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if (value.trim()) {
                // 여기 공부하기
                const newMessage: Message = { name: "User", type: true, content: value };
                setData([...data, newMessage]);
                setValue("");
            }
        }
    })

    return (
        <div className="MainContainer">
            <div className="ChatPage">
                <div className="ChatListContainer" >
                    {/* 데이터가 있을 때만 ChatList 렌더링 */}
                    {data.length > 0 ? (
                        <ChatList data={data} />
                    ) : (
                        <div className="EmptyMessage">새로운 대화를 시작해 보세요.</div>
                    )}

                </div>
                <TextInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onClick={handleSendMessage}
                />
            </div>
        </div>
    );
}

export default Home;
