interface ParticleBurst3DProps {
    position: [number, number, number];
    color?: string;
    count?: number;
    duration?: number;
    onComplete?: () => void;
    containerClassName?: string;
    standalone?: boolean;
}
export default function ParticleBurst3D({ position, color, count, duration, onComplete, containerClassName, standalone }: ParticleBurst3DProps): import("react/jsx-runtime").JSX.Element;
export {};
