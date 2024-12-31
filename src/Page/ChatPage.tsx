import React, { useState, useEffect } from "react";
import ChatList from "../Components/Chats/Chatlist";
import TextInput from "../Components/Inputs/TextInput";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { getDatabase, ref, push, onValue } from "firebase/database";

import "./Page.scss";

// 메시지 타입 정의
interface Message {
    name: string;
    type: boolean;
    content: string;
    state?: boolean;
    userid: string;
}

function Home() {
    const [isLargeScreen, setIsLargeScreen] = useState(false); // 화면 크기 상태
    const [data, setData] = useState<Message[]>([]); // 채팅 데이터 상태
    const [value, setValue] = useState(""); // 입력값 상태
    const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
    const realtimeDb = getDatabase();

    // Firestore 컬렉션 참조
    const chatCollectionRef = collection(db, "chats"); // chats  대신 사용자 이름 or ID 넣어야함

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

    useEffect(() => {
        const unsubscribe = onSnapshot(chatCollectionRef, (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
                const { userid, ...restData } = doc.data() as Message;
                return {
                    userid: doc.id,
                    ...restData,
                };
            });
            setData(messages); // 상태 업데이트
        });

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const chatRef = ref(realtimeDb, "chats");
        onValue(chatRef, (data) => {
            const messages = data.val();
            if (messages) {
                const parsedMessages = Object.values(messages) as Message[];
                setData(parsedMessages);
            }
        });
    }, []);

    // 채팅 전송 처리
    const handleSendMessage = async () => {
        if (value.trim()) {
            const newMessage: Message = {
                userid: loggedInUserId || "anonymous",
                name: "User",
                type: true,
                content: value,
            };
            try {
                await addDoc(chatCollectionRef, newMessage);
            } catch (error) {
                console.error(error);
            }

            try {
                const chatRef = ref(realtimeDb, "chats"); // chats  대신 사용자 이름 or ID 넣어야함
                await push(chatRef, newMessage);
            } catch (error) {
                console.error(error);
            }

            setValue("");
        }
    };

    // Enter 키
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && value.trim()) {
                handleSendMessage();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [value]);

    // 채팅 스크롤 처리
    useEffect(() => {
        const chatscroll = document.querySelector(".ChatListContainer") as HTMLElement;
        const chatlist = document.querySelector(".chatlist") as HTMLElement;
        const scrollHeight = chatlist?.offsetHeight;

        chatscroll?.scrollTo({
            top: scrollHeight + 140,
        });
    }, [data]);

    return (
        <div className="MainContainer">
            <div className="ChatPage">
                <div className="ChatListContainer">
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
