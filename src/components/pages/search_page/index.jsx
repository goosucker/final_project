import st from "./style.module.scss";
import { SearchDesk } from "./SearchDesk/SearchDesk";

const SearchPage = () => {
    return (
        <main className={st.main}>
            <h2 className={st.main__header}>Найдите необходимые данные в пару кликов.</h2>
            <p className={st.main__text}>Задайте параметры поиска.<br/> Чем больше заполните, тем точнее поиск</p>
            <SearchDesk />
        </main>
    )
}

export { SearchPage };