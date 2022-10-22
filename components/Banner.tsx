import * as React from 'react';
import Image from 'next/image';
import logo from '../public/images/logo.svg';

export default function Banner() {
    return (
        <header id="header" className="alt">
            <span className="logo"><Image src={logo} alt="" /></span>
            <h1>PZ Solutions</h1>
            <p>Zarządzanie projektami IT &middot; Tworzenie oprogramowania na zamówienie &middot; Doradztwo&nbsp;IT</p>
        </header>
    );
}
