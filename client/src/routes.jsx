import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "./App";
import AppMain from "./components/page/AppMain";
import AppMenu from "./components/page/AppMenu";
import AppCategoryMenu from "./components/page/AppCategoryMenu";
import ErrorPage from "./components/ErrorPage";
import AppOrder from "./components/page/AppOrder";
import AppProduct from "./components/page/AppProduct";
import AppCategory from "./components/page/AppCategory";
import AppAdminDashboard from "./components/page/dashboard/AppAdminDashboard";
import RFMAnalysis from "./components/page/dashboard/RFMAnalysis";
import TransactionTable from "./components/page/Orders";
import WebDashboard from "./components/page/dashboard/WebDashboard";
import AppCompare from "./components/page/AppCompare";
import About from "./components/About";
import Contact from "./components/page/Contact";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<App/>}>
        <Route path="/" element={<AppMain/>}/>
        <Route path="/menu" element={<AppMenu/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/menu/:id" element={<AppCategoryMenu/>}/>
        <Route path="/order" element={<AppOrder/>}/>
        <Route path="/product" element={<AppProduct/>}/>
        <Route path="/category" element={<AppCategory/>}/>
        <Route path="/compare" element={<AppCompare/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard" element={<AppAdminDashboard/>}/>
        <Route path="/rfm" element={<RFMAnalysis/>}/>
        <Route path="/orders" element={<TransactionTable/>}/>
        <Route path="/web_analytics" element={<WebDashboard/>}/>
        <Route path="/*" element={<ErrorPage/>}/>
    </Route>
));
