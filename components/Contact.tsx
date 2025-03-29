import * as React from 'react';

interface ContactProps {
    lang?: string;
}

export default function Contact({ lang = "pl" }: ContactProps) {
    return (
        <footer id="footer">
            {lang === "en" ? (
                <section className="contact-en">
                    <h2>Contact Information</h2>
                    <dl className="alt">
                        <dt>Address</dt>
                        <dd>Górczewska 224 m. 417 • 01-460, Warsaw • Poland</dd>
                        <dt>Tax ID</dt>
                        <dd>797-174-35-23</dd>
                        <dt>Email</dt>
                        <dd><a href="mailto:biuro@pz-solutions.pl">biuro@pz-solutions.pl</a></dd>
                    </dl>
                    <ul className="icons">
                        <li><a href="https://twitter.com/wooboox" className="icon fa-twitter alt" aria-label="twitter"><span className="label">Twitter</span></a></li>
                        <li><a href="https://github.com/pz-solutions" className="icon fa-github alt" aria-label="github"><span className="label">GitHub</span></a></li>
                    </ul>
                </section>
            ) : (
                <section className="contact-pl">
                    <h2>Dane kontaktowe</h2>
                    <dl className="alt">
                        <dt>Adres</dt>
                        <dd>ul. Górczewska 224 m. 417 • 01-460, Warszawa • Polska</dd>
                        <dt>NIP</dt>
                        <dd>797-174-35-23</dd>
                        <dt>Email</dt>
                        <dd><a href="mailto:biuro@pz-solutions.pl">biuro@pz-solutions.pl</a></dd>
                    </dl>
                    <ul className="icons">
                        <li><a href="https://twitter.com/wooboox" className="icon fa-twitter alt" aria-label="twitter"><span className="label">Twitter</span></a></li>
                        <li><a href="https://github.com/pz-solutions" className="icon fa-github alt" aria-label="github"><span className="label">GitHub</span></a></li>
                    </ul>
                </section>
            )}
        </footer>
    );
}
