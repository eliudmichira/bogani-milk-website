interface MenuItem {
    name: string;
    path: string;
}
interface MenuCategory {
    name: string;
    items: MenuItem[];
}
interface FeaturedProduct {
    name: string;
    image: string;
    description: string;
    path: string;
}
interface MenuData {
    categories: MenuCategory[];
    featured?: FeaturedProduct;
}
declare const menuData: Record<string, MenuData>;
export declare function getRandomColor(item: string): string;
export declare function getMenuData(item: string): MenuData;
export default menuData;
