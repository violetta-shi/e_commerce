import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { compareStateSelector } from "../../store/compareSlice";
import { Link } from "react-router-dom";

export default function CompareNavbarButton() {
    const { items } = useSelector(compareStateSelector);
    const compareCount = Object.keys(items).length;

    return (
        <Link to="/compare">
            <Button variant="link" className="btn-p0 position-relative">
                <span className="bi-arrow-left-right fs-large text-white"></span>
                {compareCount > 0 && (
                    <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
                        {compareCount}
                    </span>
                )}
            </Button>
        </Link>
    );
} 