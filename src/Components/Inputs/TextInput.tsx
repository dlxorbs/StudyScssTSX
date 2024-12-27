import React from "react";
import './Input.scss'
import { ReactComponent as Send } from './img/send.svg';
interface Props {
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function TextInput({ type, value, onChange, onClick }: Props) {
    return (
        <div className="textInput InputContainer">
            <input type={type} value={value} onChange={onChange} />
            <button onClick={onClick}><Send /></button>
        </div>
    );
}

export default TextInput;
