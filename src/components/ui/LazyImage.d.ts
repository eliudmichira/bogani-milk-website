import React from 'react';
interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholderColor?: string;
    width?: number | string;
    height?: number | string;
}
declare const LazyImage: React.FC<LazyImageProps>;
export default LazyImage;
