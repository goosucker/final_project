import st from './style.module.scss';
import Carousel from  "./Carousel/Carousel"
import Tarrif from './Tarrif/Tarrif';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
    const isAuthorization = useSelector(state => state.user.user.isLogin);
    const navigate = useNavigate();

    return (
        <main className={st.main}>
            <section className={st.main__firstblock}>
                <h1>
                    сервис по поиску <br /> 
                    публикаций <br /> 
                    о компании <br /> 
                    по его ИНН
                </h1>
                <p id={st.main__text}>
                    Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                </p>
                <button 
                    className={st.button} 
                    style={{display: `${isAuthorization ? "block" : "none"}`}}
                    onClick={() => navigate("/search")}
                >
                    Запросить данные
                </button>
            </section>
            <section>
                <h2 className={st.main__whyweheading}>почему именно мы</h2>
                <Carousel />
                <div className={st.main__img}></div>
            </section>
            <h2 className={st.main__tarrifheading}>наши тарифы</h2>
            <section className={st.main__ourtarrifs}>
                <Tarrif 
                    heading = "Beginner"
                    headingColor = "#FFB64F"
                    headingImg= "/img/tarrif_icon_first.svg"
                    forWho = "Для небольшого исследования"
                    price = {799}
                    oldPrice = {1200}
                    offer = "или 150 ₽/мес. при рассрочке на 24 мес."
                    tarrifList = {["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]}
                    isSelected= {isAuthorization}
                />
                <Tarrif 
                    heading = "Pro"
                    headingColor = "#7CE3E1"
                    headingImg= "/img/tarrif_icon_second.svg"
                    forWho = "Для HR и фрилансеров"
                    price = {1299}
                    oldPrice = {2600}
                    offer = "или 279 ₽/мес. при рассрочке на 24 мес."
                    tarrifList = {["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]}
                    isSelected = {false}
                />
                <Tarrif 
                    heading = "Business"
                    headingColor = "#000000"
                    headingImg= "/img/tarrif_icon_third.svg"
                    forWho = "Для корпоративных клиентов"
                    price = {2379}
                    oldPrice = {3700}
                    offer = "ㅤ"
                    tarrifList = {["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]}
                    isSelected= {false}
                />
            </section>
        </main>
    )
}
export {MainPage};