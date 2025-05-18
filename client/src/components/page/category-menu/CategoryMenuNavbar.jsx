import { useDispatch, useSelector } from "react-redux";
import { categoriesStateSelector, getCategories } from "../../../store/categorySlice";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../util/Loader";

export default function CategoryMenuNavbar() {
    const { categories } = useSelector(categoriesStateSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    if (!categories) {
        return <Loader variant="dark" />;
    }

    return (
        <div className="d-flex flex-column gap-3">
            {categories.map(category => (
                <NavLink
                    key={category.id}
                    to={`/menu/${category.id}`}
                    className={({ isActive }) =>
                        `text-decoration-none text-dark ${isActive ? 'fw-bold' : ''}`
                    }
                >
                    {category.name}
                </NavLink>
            ))}
        </div>
    );
}
