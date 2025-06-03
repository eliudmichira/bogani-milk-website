interface ActiveIndicatorProps {
    activeItem: string | null;
    navLinks: Array<{
        name: string;
        path: string;
    }>;
}
export default function ActiveIndicator({ activeItem, navLinks }: ActiveIndicatorProps): import("react/jsx-runtime").JSX.Element | null;
export {};
