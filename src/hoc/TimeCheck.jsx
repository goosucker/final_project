import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { removeUser } from "../store/userSlice";

const TimeCheck = ({children}) => {
    const expire = useSelector(state => state.user.user.expire);
    const isAuthorization = useSelector(state => state.user.user.isLogin);
    const location = useLocation();
    const dispatch = useDispatch();

    const isTimeOut = () => {
        const currentDate = new Date().getTime();
        const remainingDate = new Date(expire).getTime();

        if (currentDate <= remainingDate) {
            return false
        } else return true
    }

    if (isAuthorization) {
        if (isTimeOut()) {
            dispatch(removeUser());
            alert("Время вашей сессии кончилось, авторизуйтесь снова");
            <Navigate to="/auth" state={{from: location}} />
        } else {
            return children;
        }
    } else return children;
}

export { TimeCheck };