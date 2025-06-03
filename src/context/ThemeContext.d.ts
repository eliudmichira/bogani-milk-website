import { type ReactNode } from 'react';
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}
interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
}
export declare function ThemeProvider({ children, defaultTheme }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ThemeContextType;
export {};
