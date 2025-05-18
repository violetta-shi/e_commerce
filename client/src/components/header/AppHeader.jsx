import { useState } from 'react';
import { Stack, Form, InputGroup } from "react-bootstrap";
import {Link} from "react-router-dom";
import UserNavbarButton from "./UserNavbarButton";
import BucketNavbarButton from "./BucketNavbarButton";
import FavoritesNavbarButton from "./FavoritesNavbarButton";
import CompareNavbarButton from "./CompareNavbarButton";
import TransactionTable from '../page/Orders';

export default function AppHeader() {
    return (
        <header className="hstack navbar text-white">
            <Stack direction="horizontal" className="align-items-center fs-1 p-0">
                <Stack className="align-self-auto">
                    <img src="/img/мтс.png" alt="Мтс" className="mobile-icon"/>
                    <img src="/img/a1.png" alt="А1" className="mobile-icon"/>
                    <img src="/img/life.png" alt="Life" style={{width: '7px', height: '12px'}}/>
                </Stack>
                <p className="m-0">7788</p>
            </Stack>
            <div className="text-center">
                <Link to="/" className="nav-link">
                    <p className="m-0">Магазин</p>
                    <p className="m-0">электронной коммерции</p>
                </Link>
            </div>
            <div className="text-center">
                <BucketNavbarButton />
                <FavoritesNavbarButton />
                <CompareNavbarButton />
                <UserNavbarButton />
            </div>
        </header>
    )
}