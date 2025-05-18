import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";

function NavbarLink({ to, children }) {
    return (
        <Nav.Link as={NavLink} to={to}>
            {children}
        </Nav.Link>
    );
}

export default function AppNavbar() {
    return (
        <nav className="nav nav-orange justify-content-around py-2 px-1 fs-5-5 rounded-4 bg-white">
            <NavbarLink to="/menu">Каталог</NavbarLink>
            <NavbarLink to="/promo">Акции</NavbarLink>
            <NavbarLink to="/delivery">Доставка</NavbarLink>
            <NavbarLink to="/contact">Контакты</NavbarLink>
            <NavbarLink to="/about">О нас</NavbarLink>
        </nav>
    )
}