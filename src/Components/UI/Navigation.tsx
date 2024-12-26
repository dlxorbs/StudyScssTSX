import React, { useState } from 'react';
import "./UI.scss";

interface NavProps {
    id: string;
    label: string;
    isActive: boolean;
    onClick: (id: string) => void;
}

const Nav = ({ id, label, isActive, onClick }: NavProps) => {
    return (
        <div
            className={`Navitem ${isActive ? 'active' : ''}`}
            onClick={() => onClick(id)}
        >
            <div className="img"></div>
            <span className="text">{label}</span>
        </div>
    );
};

function Navigation() {
    const [selected, setSelected] = useState<string>('nav1');

    const handleClick = (id: string) => {
        setSelected(id);
    };

    const navItems = [
        { id: 'nav1', label: 'Home' },
        { id: 'nav2', label: 'About' },
        { id: 'nav3', label: 'Services' },
        { id: 'nav4', label: 'Contact' },
    ];

    return (
        <div className={`NavigationBar`}>
            {navItems.map((item) => (
                <Nav
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    isActive={item.id === selected}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
}

export default Navigation;
