import React from "react";
import st from "./style.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../store/userSlice";
import UserInfo from "../UserInfo/UserInfo";

const Autho = () => {
    const isAuthorization = useSelector(state => state.user.user.isLogin);
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.user.login);
    const exitBtnClick = () => dispatch(removeUser());

    if (isAuthorization) {
        return (
            <div className={st.header__userbox}>
                <UserInfo />
                <div className={st.header__user}>
                    <div className={st.header__user_name_btn}>
                        <p className={st.header__user_name}>{username}</p>
                        <button 
                            className={st.header__user_btn} 
                            onClick={exitBtnClick}
                        >
                            Выйти
                        </button>
                    </div>
                    <img src="/img/user_icon.svg" width="32px"/>
                </div>
            </div>
        )
    } else {
        return (
            <div className={st.header__authobox}>
                <Link  to="/reg" className={st.header__regbtn}>Зарегистрироваться</Link>
                <img src="/img/auth_stick_img.svg"/>
                <Link  to="/auth" className={st.header__logbtn}>Войти</Link>
            </div>
        )
    }
}
export default Autho;