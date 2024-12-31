import React, { useState, useEffect } from 'react';
import './Page.scss';
import ChatPage from '../Page/ChatPage'
import Users from '../Components/User/User';

function Home() {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    // 체크: 화면 크기에 따라 상태 업데이트
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 700);
        };

        // 초기화 및 리사이즈 이벤트 리스너 추가
        handleResize();
        window.addEventListener('resize', handleResize);

        // 클린업
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="MainContainer">
            <div className="ListSection">
                <div className="List"><Users /></div>
            </div>
            {isLargeScreen && (
                <ChatPage />
            )}
        </div>
    );
}

export default Home;
