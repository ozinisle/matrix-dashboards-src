import { BaseMenuItemInterface } from './interfaces/base-menu-item.interface';


export class BaseMenuItemModal implements BaseMenuItemInterface {
    label: string;
    navigationRouteUrl: string;

    setLabel(label: string): BaseMenuItemModal {
        this.label = label;
        return this;
    }

    setNavigationRouteUrl(navigationRouteUrl: string): BaseMenuItemModal {
        this.navigationRouteUrl = navigationRouteUrl;
        return this;
    }
}
