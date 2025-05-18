import AppNavbar from "./navbar/AppNavbar";
import MainContainer from "../util/MainContainer";
import {Row} from "react-bootstrap";
import CategoryMenuNavbar from "./category-menu/CategoryMenuNavbar";
import CategoryMenuGrid from "./category-menu/CategoryMenuGrid";

export default function AppCategoryMenu() {
    return (
        <>
            <AppNavbar/>
            <MainContainer>
                <Row className="mx-5">
                    <div className="col-3">
                        <CategoryMenuNavbar/>
                    </div>
                    <div className="col-9">
                        <CategoryMenuGrid/>
                    </div>
                </Row>
            </MainContainer>
        </>
    )
}