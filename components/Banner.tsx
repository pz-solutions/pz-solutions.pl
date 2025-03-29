import * as React from 'react';
import Image from 'next/image';
import logo from '../public/images/logo.svg';
import Link from 'next/link';

export default function Banner({ description }: { description: string }) {
    return (
        <header id="header" className="alt">
            <div className="language-switcher" style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "10px" }}>
                <Link href="/" title="Polish">
                    <img src="https://flagcdn.com/32/pl.png" alt="PL" style={{ width: "32px", height: "auto" }} />
                </Link>
                <Link href="/en" title="English">
                    <img src="https://flagcdn.com/32/gb.png" alt="EN" style={{ width: "32px", height: "auto" }} />
                </Link>
            </div>
            <span className="logo"><Image src={logo} alt="" /></span>
            <h1>PZ Solutions</h1>
            <p>{description}</p>
        </header>
    );
}
