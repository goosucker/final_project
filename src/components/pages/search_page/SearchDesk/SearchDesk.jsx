import { useState, useEffect } from "react";
import st from "./style.module.scss";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { addSearchInfo } from "../../../../store/searchSlice";
import { useNavigate } from "react-router-dom";

const tonOptions = [
    { value: "any", label: "Любая" },
    { value: "positive", label: "Позитивная" },
    { value: "negative", label: "Негативная" },
]

export const SearchDesk = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tonSelectedOption, setTonSelectedOption] = useState(null);
    const [innValue, setInnValue] = useState('');
    const [docValue, setDocValue] = useState('');
    const [firstDateValue, setFirstDateValue] = useState('');
    const [secondDateValue, setSecondDateValue] = useState('');
    const [checkBoxValues, setCheckBoxValue] = useState({
        input1: false,
        input2: false,
        input3: false,
        input4: false,
        input5: false,
        input6: false,
        input7: false,
    })
    const [innError, setInnError] = useState(false);
    const [docError, setDocError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const innCheck = (inn) => {
        if (inn.length !== 10 || inn < 0 || !/^\d+$/.test(inn)) {
            setInnError(true);
        } else {
            const checkDigit = (inn, coefficients) => {
                let n = 0;
                coefficients.forEach((coef, i) => n += coef * inn[i]);
                return parseInt(n % 11 % 10);
            };
            let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
            setInnError(n10 !== parseInt(inn[9]));
        }
    }

    const docCheck = (docNum) => {
        if (docNum < 1 || docNum > 1000 || Math.floor(docNum) !== parseInt(docNum)) {
            setDocError(true);
        } else {
            setDocError(false);
        }
    }

    const dateCheck = (first, second) => {
        const firstDate = new Date(first).getTime();
        const secondDate = new Date(second).getTime();
        const currentDate = new Date().getTime();

        if (firstDate > secondDate || firstDate > currentDate || secondDate > currentDate) {
            setDateError(true);
        } else {
            setDateError(false);
        }
    }

    const handleCheckBoxChange = (e) => {
        const { checked, name } = e.target;
        setCheckBoxValue(prevValues => ({ ...prevValues, [name]: checked }));
    }

    const checkErrors = () => {
        return innError || docError || dateError || !innValue || !docValue || !firstDateValue || !secondDateValue;
    }

    useEffect(() => {
        setIsButtonDisabled(checkErrors());
    }, [innValue, docValue, firstDateValue, secondDateValue, innError, docError, dateError]);

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!checkErrors()) {
            dispatch(addSearchInfo({
                startDate: firstDateValue,
                endDate: secondDateValue,
                onlyMainRole: checkBoxValues.input3,
                onlyWithRiskFactors: checkBoxValues.input4,
                tonality: tonSelectedOption.value,
                inn: innValue,
                maxFullness: checkBoxValues.input1,
                inBusinessNews: checkBoxValues.input2,
                limit: docValue,
                isTechNews: checkBoxValues.input5,
                isAnnouncement: checkBoxValues.input6,
                isDigest: checkBoxValues.input7,
            }));
            console.log('Данные успешно добавлены в Redux');
            navigate('/result');
        }
    }



    return (
        <form className={st.main__search} onSubmit={(e) => e.preventDefault()}>
            <div className={st.main__search_firstblock}>
                <p className={st.main__search_text}>ИНН компании<span style={{color: innError ? "#FF5959" : ''}}>*</span></p>
                <div style={{position: "relative"}}>
                    <input 
                        className={st.main__search_input} 
                        style={{border: innError ? "1px solid #FF5959" : ""}}
                        type="text" 
                        placeholder="10 цифр"
                        value={innValue}
                        onChange={(e) => {
                            setInnValue(e.target.value);
                            innCheck(e.target.value);
                        }}
                    />
                    <p className={st.error} style={{display: innError ? "block" : "none"}}>Введите корректные данные</p>
                </div>
                <p className={st.main__search_text}>Тональность</p>
                <div className={st.tonbox}>
                    <Select 
                        styles={{
                            control: styles => ({ ...styles, marginBottom: "8%", height: "43px", width: "100%" })
                        }}
                        value={tonSelectedOption}
                        onChange={setTonSelectedOption}
                        options={tonOptions}
                    />
                </div>
                <p className={st.main__search_text}>Количество документов в выдаче<span style={{color: docError ? "#FF5959" : ''}}>*</span></p>
                <div style={{position: "relative"}}>
                    <input 
                        className={st.main__search_input} 
                        style={{border: docError ? "1px solid #FF5959" : ""}}
                        type="number" 
                        placeholder="От 1 до 1000" 
                        value={docValue}
                        onChange={(e) => {
                            setDocValue(e.target.value);
                            docCheck(e.target.value);
                        }}
                    />
                    <p className={st.error} style={{display: docError ? "block" : "none"}}>Введите корректные данные</p>
                </div>
                <p className={st.main__search_text}>Диапазон поиска<span>*</span></p>
                <div style={{position: "relative"}}>
                    <input 
                        className={st.main__search_input} 
                        style={{width: "40%", border: dateError ? "1px solid #FF5959" : ""}} 
                        type="date" 
                        value={firstDateValue}
                        onChange={(e) => {
                            setFirstDateValue(e.target.value);
                            dateCheck(e.target.value, secondDateValue);
                        }}
                    />
                    <input 
                        className={st.main__search_input} 
                        style={{width: "40%", border: dateError ? "1px solid #FF5959" : ""}} 
                        type="date" 
                        value={secondDateValue}
                        onChange={(e) => {
                            setSecondDateValue(e.target.value);
                            dateCheck(firstDateValue, e.target.value);
                        }}
                    />
                    <p className={st.error} style={{display: dateError ? "block" : "none"}}>Введите корректные данные</p>
                </div>
            </div>
            <div className={st.main__search_secondblock}>
                <div className={st.main__search_checkbox}>
                    <input type="checkbox" id="input1" name="input1" checked={checkBoxValues.input1} onChange={handleCheckBoxChange} />
                    <label htmlFor="input1">Признак максимальной полноты</label>
                </div>
                <div className={st.main__search_checkbox}>
                    <input type="checkbox" id="input2" name="input2" checked={checkBoxValues.input2} onChange={handleCheckBoxChange} />
                    <label htmlFor="input2">Упоминание в бизнес-контексте</label>
                </div>
                <div className={st.main__search_checkbox}>
                    <input type="checkbox" id="input3" name="input3" checked={checkBoxValues.input3} onChange={handleCheckBoxChange} />
                    <label htmlFor="input3">Главная роль в публикации</label>
                </div>
                <div className={st.main__search_checkbox}>
                    <input type="checkbox" id="input4" name="input4" checked={checkBoxValues.input4} onChange={handleCheckBoxChange} />
                    <label htmlFor="input4">Публикация только с риск-факторами</label>
                </div>
                <div className={st.main__search_checkbox}>
                    <input type="checkbox" id="input5" name="input5" checked={checkBoxValues.input5} onChange={handleCheckBoxChange} />
                    <label htmlFor="input5">Включать технические новости рынков</label>
                </div>
                <div className={st.main__search_checkbox}>
                    <input type="checkbox" id="input6" name="input6" checked={checkBoxValues.input6} onChange={handleCheckBoxChange} />
                    <label htmlFor="input6">Включать анонсы и календари</label>
                </div>
                <div className={st.main__search_checkbox}>
                    <input type="checkbox" id="input7" name="input7" checked={checkBoxValues.input7} onChange={handleCheckBoxChange} />
                    <label htmlFor="input7">Включать сводки новостей</label>
                </div>
            </div>

            <div className={st.main__search_btntextbox}>
                <button 
                    className={st.main__search_btn}
                    onClick={handleButtonClick}
                    disabled={isButtonDisabled}
                    style={{ opacity: isButtonDisabled ? "0.5" : "", cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
                >
                    Поиск
                </button>
                <p className={st.main__search_reqtext}>* Обязательные к заполнению поля</p>
            </div>
        </form>
    );
}
