import React, { useEffect, useState } from "react";
import st from "./style.module.scss"

export const Article = ({ xmlData }) => {
    const [description, setDescription] = useState("");
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (xmlData) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, "text/xml");
            const sentences = xmlDoc.getElementsByTagName("sentence");
            let articleDescription = "";
            for (let i = 0; i < sentences.length; i++) {
                const sentenceText = sentences[i].textContent
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&")
                    .replace(/<\/?[^>]+(>|$)/g, ""); 
                articleDescription += sentenceText + " ";
            }
            setDescription(articleDescription.trim());

            const imgTag = xmlDoc.querySelector("img");
            if (imgTag) {
                setImageSrc(imgTag.getAttribute("src"));
            }
        }
    }, [xmlData]); 

    return (
        <div className={st.article_container}>
            <div className={st.article_img_container}>
                {imageSrc && <img src={imageSrc} alt="Article Image" className={st.article_img}/> || 
                <img src="/img/article_img.png" alt="Article Image" className={st.article_img}/>}
            </div>
            <p className={st.article}>{description}</p>
        </div>
    );
};

