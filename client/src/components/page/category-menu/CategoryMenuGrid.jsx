import {useParams} from "react-router-dom";
import {Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProducts, productsStateSelector} from "../../../store/productSlice";
import Loader from "../../util/Loader";
import CategoryMenuItem from "./CategoryMenuItem";

export default function CategoryMenuGrid() {
    const { id } = useParams();
    const { isLoading, products, error } = useSelector(productsStateSelector);
    const categoryProducts = products[id];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(id));
    }, [id, dispatch]);

    if (isLoading || !categoryProducts) {
        return <Loader variant="dark"/>;
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <Row className="row-cols-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
            {Object.entries(categoryProducts).map(([key, productList]) =>
                (<CategoryMenuItem products={productList} key={key} />))}
        </Row>
    )
}