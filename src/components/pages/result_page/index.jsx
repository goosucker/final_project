import st from './style.module.scss';
import { GeneralSummary } from './GeneralSummary/GeneralSummary';
import { Documents } from './Documents/Documents';
import { useState } from 'react';

export const ResultPage = () => {
    
    const [docsValue, setDocsValue] = useState('...');

    return(
        <main className={st.main}>
            <h2 className={st.first_heading}>Ищем. Скоро <br/> будут результаты</h2>
            <p className={st.text}>Поиск может занять некоторое время, просим сохранять терпение.</p>
            <h3 className={st.second_heading}>Общая сводка</h3>
            <p className={st.found_text}>Найдено вариантов {docsValue}</p>
            <GeneralSummary updateDocsValue={setDocsValue}/>
            <h3 className={st.third_heading}>Список документов</h3>
            <Documents />
        </main>
    )
}

