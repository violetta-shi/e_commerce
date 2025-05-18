import Banner from "./main/Banner";
import AppNavbar from "./navbar/AppNavbar";
import CategoryGrid from "./category/CategoryGrid";
import MainContainer from "../util/MainContainer";

export default function AppMain() {
    return (
        <>
            <Banner/>
            <AppNavbar/>
            <MainContainer>
                <CategoryGrid/>
            </MainContainer>
        </>
    );
}