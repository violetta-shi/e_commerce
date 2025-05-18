import {Col, Row} from "react-bootstrap";
import {Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
    import MainContainer from "../../util/MainContainer";
import {useEffect} from "react";
import DashboardPieChart from "./DashboardPieChart";
import {useDispatch, useSelector} from "react-redux";
import {getProductStatistics, productsStateSelector} from "../../../store/productSlice";
import Loader from "../../util/Loader";
import {authStateSelector} from "../../../store/authSlice";
import {useNavigate} from "react-router-dom";

export default function AppAdminDashboard() {
    const { currentUser } = useSelector(authStateSelector);
    const { statistics } = useSelector(productsStateSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser?.role !== 'ADMIN') {
            navigate("/");
        }
    }, [currentUser]);
    useEffect(() => {
        const dateToStr = (date) => date.toISOString().substring(0, 7);
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        dispatch(getProductStatistics({ start: dateToStr(startDate), end: dateToStr(new Date()) }));
    }, []);

    if (!statistics) {
        return <Loader />;
    }

    return (
        <MainContainer>
            <h2 className="text-center">Статистика</h2>
            <Row className="mt-3">
                <Col>
                    <h4 className="text-center">Заказы по месяцам</h4>
                    <ResponsiveContainer height={250}>
                        <BarChart data={statistics.orderCountStatistic}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => [value, "Заказы"]} />
                            <Bar dataKey="count" fill="var(--orange)" />
                        </BarChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h4 className="text-center">Выручка по месяцам</h4>
                    <ResponsiveContainer height={250}>
                        <AreaChart data={statistics.revenueStatistic} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="orange" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--orange)" stopOpacity={1.9}/>
                                    <stop offset="95%" stopColor="var(--orange-gray)" stopOpacity={0.01}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip formatter={(value) => [value, "Выручка"]} />
                            <Area type="monotone" dataKey="revenue" stroke="var(--orange)" fillOpacity={1} fill="url(#orange)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col lg={6}>
                    <DashboardPieChart title={"Топ 10 товаров за всё время"} renderPercent={false}
                                       dataKey={"count"} nameKey={"name"} data={statistics.topProductStatistic}/>
                </Col>
                <Col lg={6}>
                    <DashboardPieChart title={"Способы оплаты"} renderPercent={true} dataKey={"count"}
                                       nameKey={"payment_method"} data={statistics.paymentMethodStatistic}/>
                </Col>
            </Row>
        </MainContainer>
    )
}
