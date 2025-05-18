import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";
import AppHeader from "./components/header/AppHeader";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {authStateSelector, getSelf} from "./store/authSlice";
import Loader from "./components/util/Loader";
import NotificationContainer from "./components/util/NotificationContainer";
import Footer from "./components/util/Footer";

export default function App() {
    const { currentUser } = useSelector(authStateSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSelf());
    }, [currentUser]);

    return (
        currentUser === undefined
            ? <Loader/>
            : (
                <>
                    <Container>
                        <AppHeader/>
                        <Outlet/>
                    </Container>
                    <Footer/>
                    <NotificationContainer/>
                </>
            )
    )
}