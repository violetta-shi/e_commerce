import AppNavbar from "./navbar/AppNavbar";
import MainContainer from "../util/MainContainer";
import CategoryGrid from "./category/CategoryGrid";

export default function AppMenu() {
    return (
        <>
            <AppNavbar/>
            <MainContainer>
                <CategoryGrid/>
            </MainContainer>
        </>
    );
}