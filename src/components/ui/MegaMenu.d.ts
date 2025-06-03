interface MegaMenuProps {
    item: string;
    onClose: () => void;
    theme?: 'light' | 'dark';
    accentColor?: string;
}
export default function MegaMenu({ item, onClose, theme, accentColor }: MegaMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
