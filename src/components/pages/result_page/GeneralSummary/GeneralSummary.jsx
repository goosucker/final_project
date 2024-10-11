import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { basedURL } from "../../../../basedURL";
import { useSelector } from "react-redux";
import "./styles.scss";
import { useEffect, useState } from "react";

export const GeneralSummary = ({ updateDocsValue }) => {
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
    const [summaryInfo, setSummaryInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const postData = async () => {
        try {
            const res = await axios.post(basedURL + "/api/v1/objectsearch/histograms", {
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
            setSummaryInfo(res.data.data);
            setLoading(false);
            const totalValue = res.data.data[0].data.reduce((acc, item) => acc + item.value, 0);
            updateDocsValue(totalValue);
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        postData();
    }, []);

    const settings = {
        dots: false,
        infinite: false,  
        speed: 500,  
        slidesToShow: 8,  
        slidesToScroll: 2, 
        arrows: false,
    };

    if (loading) {
        return (
            <div className="container">
                <div className="headings"> 
                    <p>Период</p>
                    <p>Всего</p>
                    <p>Риски</p>
                </div>
                <div className="loaderbox">
                    <span className="loader"></span>
                    <p className="loadertext">Загружаем данные </p>
                </div>
            </div>
        );
    } else if (summaryInfo.length == 0) {
        return (
            <div className="container">
                <div className="headings"> 
                    <p>Период</p>
                    <p>Всего</p>
                    <p>Риски</p>
                </div>
            <div className="loaderbox">
                <p>Данные не найдены, попробуйте снова</p>
            </div>
        </div>
        )
    } else if (summaryInfo[0].data.length > 9) {

        return (
            <div className="container">
                <div className="headings"> 
                    <p>Период</p>
                    <p>Всего</p>
                    <p>Риски</p>
                </div>
    {/* Я всем сердцем ненавижу библиотеку react-slick, я уже третий день пытаюсь настроить эту карусель, я сдаюсь... */}
                <Slider {...settings} className="second_slider">
                    {summaryInfo[0].data.map((item, index) => (
                        <div key={index} className="slider_item">
                            <p>{new Date(item.date).toLocaleDateString()}</p>
                            <p>{item.value}</p>
                            <p>{summaryInfo[1].data[index]?.value}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    } else if (summaryInfo[0].data.length <= 9) {
        return (
            <div className="container">
                <div className="headings"> 
                    <p>Период</p>
                    <p>Всего</p>
                    <p>Риски</p>
                </div>
                <div className="container_item">
                    {summaryInfo[0]?.data.map((item, index) => (
                        <div key={index} className="slider_item low">
                            <p>{new Date(item.date).toLocaleDateString()}</p>
                            <p>{item.value}</p>
                            <p>{summaryInfo[1]?.data[index]?.value}</p>
                        </div>
                ))}
                </div>
            </div>
        )
    }
};
