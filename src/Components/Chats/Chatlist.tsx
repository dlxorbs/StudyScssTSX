import React from "react";
import Chat from './Chat';
import './Chat.scss'

interface Props {
    data: Array<{ name: string; type: boolean; content: string }>;
}

const ChatList = ({ data }: Props) => {
    const list = data.map((chat, index) => (
        <Chat key={index} name={chat.name} type={chat.type} content={chat.content} />
    ));

    return (
        <div className="chatlist">
            {list}
        </div>
    );
};

export default ChatList;
