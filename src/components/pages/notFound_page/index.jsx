import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div style={{height: "902px"}}>
            <h1 style={{textAlign: "center"}}>
                404 not found
            </h1>
            <button 
                style={{all: "unset", cursor: "pointer"}} 
                onClick={() => navigate(-1)}
            >
                Вернуться назад
            </button>
        </div>
    )
}

