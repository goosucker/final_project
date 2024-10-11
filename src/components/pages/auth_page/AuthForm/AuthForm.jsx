import { useEffect, useState } from 'react';
import st from './style.module.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { addUser } from '../../../../store/userSlice';
import { useDispatch } from 'react-redux';
import { basedURL } from '../../../../basedURL';


const AuthForm = () => {

    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [valueCheck, setValueCheck] = useState(false);
    const [errorClass, setErrorClass] = useState(false);
    const [enterBtnValue, setEnverBtnValue] = useState('Войти');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        setLoginValue(e.target.value)
    }
    const handlePassword = (e) => {
        setPasswordValue(e.target.value)
    }

    const buttonClick = (e) => {
        if (!valueCheck) {
            e.preventDefault();
        } else {
            e.preventDefault();
            setEnverBtnValue(<span className={st.loader}></span>);
            axios.post(basedURL + "/api/v1/account/login", {
                "login": loginValue,
                "password": passwordValue
            })
            .then((response) => {
                dispatch(addUser({
                    login: loginValue,
                    accessToken: response.data.accessToken,
                    expire: response.data.expire
                }))
                setErrorClass(false);
                navigate(fromPage);
            })
            .catch((error) => {
                console.error(error);
                setErrorClass(true)
            })
        }
    }

    useEffect(() => {
        setEnverBtnValue('Войти');
        if (loginValue.length !== 0 & passwordValue.length !== 0) {
            setValueCheck(true)
        } else setValueCheck(false)
    }, [loginValue, passwordValue]);

    return (
        <form className={st.main__form}>
        <img src="/img/auth_lock_img.svg" className={st.main__form_lock}/>
            <div className={st.main__form_buttonbox}>
                <button 
                    onClick={(e) => e.preventDefault()} 
                    className={`${st.main__form_btn} ${st.active}`}
                >
                    Войти
                </button>
                <button 
                    onClick={(e) => e.preventDefault()} 
                    className={st.main__form_btn}
                >
                    Зарегистрироваться
                </button>
            </div>
            <div className={st.main__form_inputs}>
                <p className={st.main__form_input_text}>
                    Логин или номер телефона:
                </p>
                <input 
                    type="text" 
                    className={`${st.main__form_input} ${errorClass ? st.main__form_input_error : ""}`} 
                    value={loginValue} onChange={handleLogin}
                />
                <p className={st.main__form_input_text}>
                    Пароль:
                </p>
                <input 
                    type="password" 
                    className={`${st.main__form_input} ${errorClass ? st.main__form_input_error : ""}`} 
                    value={passwordValue} onChange={handlePassword}
                />
                <p className={`${errorClass ? st.main__form_input_dataerror : st.none}`}>
                    Введены неправильные данные
                </p>
            </div>
            <button 
                className={`${st.main__form_submit} ${valueCheck ? "" : st.disabled}`} 
                onClick={buttonClick}
            >
                {enterBtnValue}
            </button>
            <Link to="/new-password" 
                className={st.main__form_new_password}
            >
                Восстановить пароль
            </Link>
            <p 
                className={st.main__form_input_text} 
                style={{marginTop: "30px"}}
            >
                Войти через:
            </p>
            <div className={st.main__form_loginvia}>
                <Link to="/google-auth">
                    <img src="/img/auth_google_img.svg" alt="гугол"/>
                </Link>
                <Link to="/meta-auth">
                    <img src="/img/auth_meta_img.svg" alt="фейсбука же нет больше..."/>
                </Link>
                <Link to="/ya-auth">
                    <img src="/img/auth_yan_img.svg" alt="яндекс"/>
                </Link>
            </div>
        </form> 
    )
}

export default AuthForm;