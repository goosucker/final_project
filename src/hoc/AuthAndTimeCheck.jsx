import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { removeUser } from "../store/userSlice";

const AuthAndTimeCheck = ({children}) => {
    const isAuthtorization = useSelector(state => state.user.user.isLogin);
    const expire = useSelector(state => state.user.user.expire);
    const location = useLocation();
    const dispatch = useDispatch();

    const isTimeOut = () => {
        const currentDate = new Date().getTime();
        const remainingDate = new Date(expire).getTime();
        console.log("Current Date:", currentDate);
        console.log("Expire Date:", remainingDate);

        return currentDate > remainingDate;
    }

    if (isAuthtorization) {
        if (isTimeOut()) {
            dispatch(removeUser());
            alert("Время вашей сессии кончилось, авторизуйтесь снова");
            return <Navigate to="/auth" state={{from: location}} />;
        } else {
            return children;
        }
    } else {
        return <Navigate to="/" state={{from: location}} />;
    }
}

export { AuthAndTimeCheck };