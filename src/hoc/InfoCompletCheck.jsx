import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { removeUser } from "../store/userSlice";

const InfoCompletCheck = ({children}) => {
    const isAuthtorization = useSelector(state => state.user.user.isLogin);
    const expire = useSelector(state => state.user.user.expire);
    const infoCheck = useSelector(state => state.searchInfo.searchInfo.inn)
    const location = useLocation();
    const dispatch = useDispatch();

    const isTimeOut = () => {
        const currentDate = new Date().getTime();
        const remainingDate = new Date(expire).getTime();
        return currentDate > remainingDate;
    }

    if (isAuthtorization) {
        if (isTimeOut()) {
            dispatch(removeUser());
            alert("Время вашей сессии кончилось, авторизуйтесь снова");
            return <Navigate to="/auth" state={{from: location}} />;
        } else {
            if (infoCheck.length !== 0) {
                return children
            } else {
                alert("Необходимо ввести данные на странице поиска");
                return <Navigate to="/search" state={{from: location}} />
            }
        }
    } else {
        return <Navigate to="/" state={{from: location}} />;
    }
}

export { InfoCompletCheck };