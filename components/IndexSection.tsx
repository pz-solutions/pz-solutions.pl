import * as React from 'react';

export interface IIndexSectionProps {
    id: string;
    children: React.ReactNode;
    header: React.ReactNode;
    footer: React.ReactNode;
}

export default function IndexSection({id, header, footer, children}: IIndexSectionProps) {
    return (
        <section id={id} className="main special">
            {header && <header className="major">{header}</header>}
            {children}
            {footer && <footer className="major">{footer}</footer>}
        </section>
    );
}
