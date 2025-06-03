import { type ReactNode } from "react";
interface DockItem {
    title: string;
    icon: ReactNode;
    href: string;
    isNavLink?: boolean;
    color?: string;
}
interface AnimatedDockProps {
    items: DockItem[];
    largeClassName?: string;
    smallClassName?: string;
    dockPosition?: 'top' | 'bottom';
    accentColor?: string;
    secondaryColor?: string;
}
export default function AnimatedDock({ items, largeClassName, smallClassName, dockPosition, accentColor, // Default green
secondaryColor, }: AnimatedDockProps): import("react/jsx-runtime").JSX.Element;
export {};
