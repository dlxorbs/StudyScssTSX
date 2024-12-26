import react from 'react'

interface Props {
    type?: string;
}

function Card({ type }: Props) {
    return (
        <div className={`Card ${type}`}>
        </div>
    );
}

export default Card;
