import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";

export interface ILayoutProps {
    children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
    return (<>
        <Head>
            <meta name="keywords" content="" />
            <link rel="shortcut icon" href="/images/website-icon.png" />
        </Head>
        <div className={`body`}>
            <div id="wrapper">
                {children}
                <Footer />
            </div>
        </div>
    </>
    );
}
