import React from "react";
import './Chat.scss'
interface Props {
    name?: string;
    type?: boolean;
    content?: string;
}


const Chat = ({ name, type, content }: Props) => {
    return (
        <div className={`${type ? 'self' : 'other'} chat`}>
            <div className="name">{name}</div>
            <div className="content">{content}</div>
        </div>
    );



}


export default Chat;