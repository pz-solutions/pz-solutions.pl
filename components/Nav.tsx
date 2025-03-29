import React from 'react';

export interface NavItem {
  title: string;
  href: string;
}

interface NavProps {
  navigationItems: NavItem[];
  sticky?: boolean;
}

export const Nav: React.FC<NavProps> = ({ navigationItems, sticky }) => {
  return (
    <nav id="nav" className={sticky ? "alt" : ""}>
      <ul>
        {navigationItems.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
