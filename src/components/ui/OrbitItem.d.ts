interface OrbitItemProps {
    link: {
        name: string;
        path: string;
    };
    index: number;
    total: number;
    isActive: boolean;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}
declare function OrbitItem({ link, index, total, isActive, isHovered, onHover, onLeave }: OrbitItemProps): import("react/jsx-runtime").JSX.Element;
export default OrbitItem;
