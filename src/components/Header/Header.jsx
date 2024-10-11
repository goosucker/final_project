import { useState, useEffect } from "react";
import Autho from "./Autho/Autho"
import HeaderNav from "./HeaderNav/HeaderNav";
import Modal from "react-modal";
import st from "./style.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../store/userSlice";

function Header() {

    const [showLowMenu, setLowMenu] = useState(false);
    const isAuthorization = useSelector(state => state.user.user.isLogin);
    
    useEffect(() => {
        if (!isAuthorization) {
            closeBtnClick(); // Закрываем меню после выхода пользователя
        }
    }, [isAuthorization]);

    const dispatch = useDispatch();

    const openBtnClick = () => {
        setLowMenu(true);
    } 
    const closeBtnClick = () => {
        setLowMenu(false);
    }


    const LowWidthMenu = (
        <div className={st.menu}>
            <img src="img/header_logo_second.svg" className={st.logo}/>
            <button onClick={closeBtnClick} className={st.btn}>
                <img src="/img/burger_btn_second.svg"/>
            </button>
            <HeaderNav 
                lowWidth={true} 
                closeBtnClick={closeBtnClick}
            />
            <div 
                className={st.links} 
                style={{display: `${isAuthorization ? "none" : "" }`}}
            >
                <Link to="/reg" 
                    className={st.reg_link} 
                    onClick={closeBtnClick}
                >
                    Зарегистрироваться
                </Link>
                <Link to="/auth" 
                    className={st.log_link} 
                    onClick={closeBtnClick}
                >
                    Войти
                </Link> 
            </div>
            <button 
                className={st.exit_link} 
                onClick={() => {
                    dispatch(removeUser());
                    console.log(isAuthorization); // Логируем текущее состояние авторизации
                }} 
                style={{display: `${isAuthorization ? "" : "none"}`}}
            >
                Выйти
            </button>
        </div>
    )

    return (
        <header className={st.header}>
            <img src="/img/header_logo.svg" alt="header_logo" className={st.header__logo}/>
            <HeaderNav LowWidth={false}/>
            <Autho />
            <button 
                className={st.header__burgerbtn} 
                onClick={openBtnClick}
            > 
            </button>
            <Modal 
                isOpen={showLowMenu} 
                onRequestClose={closeBtnClick} 
                overlayClassName={st.menu}
                className={st.menu}
                ariaHideApp={false}
            >
                {LowWidthMenu}
            </Modal> 
        </header>
    )
}
export default Header;