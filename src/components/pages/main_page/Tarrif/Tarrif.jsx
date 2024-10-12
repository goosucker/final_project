import st from "./style.module.scss";



const Tarrif = (
    {
        heading, 
        headingColor, 
        headingImg, 
        forWho, 
        price, 
        oldPrice, 
        offer, 
        tarrifList, 
        isSelected
    }
) => {
    return (
        <div 
            className={st.tarrifbox} 
            style={{border:  `${isSelected ? `2px solid ${headingColor}` : ''}`}}
        >
            <div 
                className={st.headingbox} 
                style={{backgroundColor: `${headingColor}`, backgroundImage: `url(${headingImg})`}}
            > 
                <h3 
                    className={st.tarrif__heading} 
                    style={{color: `${headingColor === "#000000" ? "#FFFFFF": ""}`}}
                >
                    {heading}
                </h3> 
                <p 
                    className={st.tarrif__heading_about} 
                    style={{color: `${headingColor === "#000000" ? "#FFFFFF": ""}`}}
                >
                    {forWho}
                </p>
            </div>
            <div className={st.tarrif__info}>
                <div className={st.tarrif__pricebox}> 
                    <p className={st.tarrif__price}>
                        {price} ₽
                    </p>
                    <p className={st.tarrif__oldprice}>
                        {oldPrice} ₽
                    </p>
                </div>
                <p className={st.tarrif__offer}>
                    {offer}
                </p>
                <div className={st.tarrif__included}> 
                    <h3 className={st.tarrif__included_heading}>
                        В тариф входит:
                    </h3>
                    <ul className={st.tarrif__list}>
                        {tarrifList.map((tarrif, key) => {
                            return (
                                <li key={key} className={st.tarrif__list_item}>
                                    <img src="/img/tarrif_list_icon.svg" alt="зеленая стрелочка"/> 
                                    {tarrif}
                                </li>
                            )
                        })}
                    </ul>
                    <button 
                        className={st.tarrif__button} 
                        style={{backgroundColor: `${isSelected ? "#D2D2D2" : "#5970FF"}` }}
                    >
                        {isSelected ? "Перейти в личный кабинет" : "Подробнее"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tarrif;