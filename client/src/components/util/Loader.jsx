import {Spinner} from "react-bootstrap";

export default function Loader({variant}) {
    return (
        <div className="d-flex justify-content-center m-3">
            <Spinner animation="grow" variant={variant || "light"}/>
        </div>
    );
}