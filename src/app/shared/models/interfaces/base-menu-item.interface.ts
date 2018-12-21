export interface BaseMenuItemInterface {
    label: string;
    navigationRouteUrl: string;

    setLabel(label: string): BaseMenuItemInterface;
    setNavigationRouteUrl(navigationRouteUrl: string): BaseMenuItemInterface;
}
