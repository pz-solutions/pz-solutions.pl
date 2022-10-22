import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/images/logo.png';

export default function Header() {
    return (
        <header id="header" className="alt">
            <div className="inner">
                <Link href="/" className="logo">
                    <a><Image src={logo} alt="PZ" layout='intrinsic' /></a>
                </Link>
            </div>
        </header>
    );
}
