import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoriesStateSelector, getCategories} from "../../../store/categorySlice";
import {Row} from "react-bootstrap";
import Loader from "../../util/Loader";
import CategoryGridItem from "./CategoryGridItem";

export default function CategoryGrid() {
    const { isLoading, categories, error } = useSelector(categoriesStateSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [categories]);

    if (isLoading) {
        return <Loader variant="dark"/>;
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <Row className="row-cols-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-5 mx-5">
            {categories && categories.map(category => <CategoryGridItem key={category.id} {...category}/>)}
        </Row>
    );
}