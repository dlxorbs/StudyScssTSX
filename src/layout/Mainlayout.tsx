// import styles from "./MainLayout.module.css";
import Header from "../Components/UI/Header"
import { Outlet } from "react-router-dom";
import Navigation from "../Components/UI/Navigation";
import './Mainlatout.scss'

const MainLayout = () => {
    return (
        <div className={'mainlayout'}>
            <Header name={''} />
            <Outlet />
            <Navigation />
        </div>
    )
}

export default MainLayout;