import st from "./style.module.scss";
import { useState, useEffect } from "react";

const Footer = () => {

    return (
        <footer className={st.footer}>
            <img src="/img/footer_icon.svg" className={st.footer__icon}/>
            <div className={st.footer__infobox}>
                <p className={st.footer__info}>
                    г. Москва, Цветной б-р, 40<br/>
                    +7 495 771 21 11<br/>
                    info@skan.ru
                </p>
                <p className={st.footer__info}>Copyright. 2022</p>
            </div>
        </footer>
    )
}

export default Footer;