import axios from "axios";
import st from "./style.module.scss";
import { useEffect, useState } from "react";
import { basedURL } from "../../../../basedURL";
import { useSelector } from "react-redux";
import { Article } from "./Article/Article";

export const Documents = () => {
    const token = useSelector(state => state.user.user.accessToken);
    const startDate = useSelector(state => state.searchInfo.searchInfo.startDate);
    const endDate = useSelector(state => state.searchInfo.searchInfo.endDate);
    const inn = useSelector(state => state.searchInfo.searchInfo.inn);
    const maxFullness = useSelector(state => state.searchInfo.searchInfo.maxFullness);
    const inBusinessNews = useSelector(state => state.searchInfo.searchInfo.inBusinessNews);
    const onlyMainRole = useSelector(state => state.searchInfo.searchInfo.onlyMainRole);
    const onlyWithRiskFactors = useSelector(state => state.searchInfo.searchInfo.onlyWithRiskFactors);
    const tonality = useSelector(state => state.searchInfo.searchInfo.tonality);
    const limit = Number(useSelector(state => state.searchInfo.searchInfo.limit));
    const isTechNews = useSelector(state => state.searchInfo.searchInfo.isTechNews);
    const isAnnouncement = useSelector(state => state.searchInfo.searchInfo.isAnnouncement);
    const isDigest = useSelector(state => state.searchInfo.searchInfo.isDigest);
    const [ids, setIds] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [currentChunk, setCurrentChunk] = useState(0);
    const [loading, setLoading] = useState(true);

    const postIDs = async () => {
        try {
            const res = await axios.post(basedURL + "/api/v1/objectsearch", {
                "intervalType": "month",
                "histogramTypes": [
                    "totalDocuments",
                    "riskFactors"
                ],
                "issueDateInterval": {
                    "startDate": startDate,
                    "endDate": endDate
                },
                "searchContext": {
                    "targetSearchEntitiesContext": {
                        "targetSearchEntities": [
                            {
                                "type": "company",
                                "inn": inn,
                                "maxFullness": maxFullness,
                                "inBusinessNews": inBusinessNews
                            },
                        ],
                        "onlyMainRole": onlyMainRole,
                        "onlyWithRiskFactors": onlyWithRiskFactors,
                        "tonality": tonality,
                    }
                },
                "similarMode": "duplicates",
                "limit": limit,
                "sortType": "issueDate",
                "sortDirectionType": "asc",
                "attributeFilters": {
                    "excludeTechNews": isTechNews,
                    "excludeAnnouncements": isAnnouncement,
                    "excludeDigests": isDigest
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const idsArray = res.data.items.map(item => item.encodedId);
            setIds(idsArray);
            console.log(idsArray.length)
        } catch (error) { 
            console.error(error);
        }
    }

    const postDocuments = async () => {
        if (currentChunk >= ids.length) return;

        const chunk = ids.slice(currentChunk, currentChunk + 10); 
        try {
            const res = await axios.post(basedURL + "/api/v1/documents", {
                "ids": chunk
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDocuments(() => [...documents, ...res.data]); 
            setCurrentChunk(prevChunk => prevChunk + 10);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (ids.length > 0) {
            postDocuments();
        } else {
            postIDs();
        }
    }, [ids.length]);

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className={st.docs_container}>
                {documents.map((doc, key) => {
                    return(
                        <div className={st.document} key={key}>
                            <p className={st.date_text}>{doc.ok.issueDate}<span style={{marginLeft: "3%", borderBottom: "2px solid #949494"}}>{doc.ok.source.name}</span></p>
                            <h1 className={st.title}><a href={doc.ok.url} style={{all: "unset"}} target="_blank">{doc.ok.title.text}</a></h1>
                            <div className={st.attribute_container}>
                                {doc.ok.attributes.isAnnouncement ? <p className={st.attribute} style={{backgroundColor: "rgb(120, 254, 120)"}}>Анонсы и События</p> : <div style={{height: "22px"}}></div>}
                                {doc.ok.attributes.isTechNews ? <p className={st.attribute} style={{backgroundColor: "orange"}}>Технические новости</p> : <div style={{height: "22px"}}></div>}
                                {doc.ok.attributes.isDigest ? <p className={st.attribute} style={{backgroundColor: "grey"}}>Сводки новостей</p> : <div style={{height: "22px"}}></div>}
                            </div>
                            <Article xmlData={doc.ok.content.markup}/>
                            <div className={st.link_container}>
                                <button className={st.linkbtn}><a href={doc.ok.url} target="_blank" className={st.link}>Читать в источнике</a></button>
                                <p className={st.word_count}>{doc.ok.attributes.wordCount} слова</p>
                            </div>
                        </div>
                    )
                })}
                {currentChunk < ids.length && (
                    <button onClick={postDocuments} className={st.load_more_button}>
                        Показать больше
                    </button>
                )}
            </div>
        )
    }
}