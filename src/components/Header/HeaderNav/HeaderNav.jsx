import st from './style.module.scss';
import { Link } from 'react-router-dom';
const HeaderNav = ({lowWidth, closeBtnClick}) => {
    return (
        <nav className={`${lowWidth ? st.header__nav_lw : st.header__nav}`}>
            <Link to="/" 
                className={`${lowWidth ? st.header__nav_link_lw : st.header__nav_link}`} 
                onClick={closeBtnClick}
            >
                Главная
            </Link>
            <Link to="/tarrifs" 
                className={`${lowWidth ? st.header__nav_link_lw : st.header__nav_link}`} 
                onClick={closeBtnClick}
            >
                Тарифы
            </Link>
            <Link to="/faq" 
            className={`${lowWidth ? st.header__nav_link_lw : st.header__nav_link}`} 
                onClick={closeBtnClick}
            >
                FAQ
            </Link>
        </nav>
    )
}
export default HeaderNav;