import st from "./style.module.scss";
import AuthForm from "./AuthForm/AuthForm";

const Authorization = () => {
    return (
        <main className={st.main}>
            <section className={st.main__info}>
                <h2 className={st.main__info_header}>
                    Для оформления подписки на тариф, необходимо авторизоваться.
                </h2>
                <img src="/img/auth_main_img.svg" alt="несут ключик" className={st.main__info_img}/> 
            </section>
            <AuthForm />
        </main>
    )
}

export { Authorization };