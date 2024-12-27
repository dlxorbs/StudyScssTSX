import React, { useState, useEffect } from "react";
import ChatList from "../Components/Chats/Chatlist";
import TextInput from "../Components/Inputs/TextInput";
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

    const handleSendMessage = () => {
        if (value.trim()) {
            // 여기 공부하기
            const newMessage: Message = { name: "User", type: true, content: value };
            setData([...data, newMessage]);
            setValue("");
        }
    };

    return (
        <div className="MainContainer">
            <div className="ChatPage">
                <div className="ChatListContainer">
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
