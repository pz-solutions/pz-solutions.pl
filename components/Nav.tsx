import * as React from 'react';

export interface INavProps {
    sticky: boolean;
}

export default function Nav(props: INavProps) {
    return (
        <nav id="nav" className={props.sticky ? 'alt' : ''}>
            <ul>
                <li>
                    <a href="#founder">Założyciel</a>
                </li>
                <li>
                    <a href="#services">Usługi</a>
                </li>
            </ul>
        </nav>
    );
}
