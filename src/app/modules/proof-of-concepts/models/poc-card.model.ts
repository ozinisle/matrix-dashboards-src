import { POCCardModelInterface } from './interfaces/poc-card-models.interface';
import { PocCardType, PocCardIconType } from './types/proof-of-concepts.types';

export class POCCardModel implements POCCardModelInterface {
    private title: string;
    private subTitle: string;
    private description: string;
    private iconType: PocCardType;
    private pocUrl: string;

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string): POCCardModel {
        this.title = title;
        return this;
    }

    getSubTitle(): string {
        return this.subTitle;
    }

    setsubTitle(subTitle: string): POCCardModel {
        this.subTitle = subTitle;
        return this;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string): POCCardModel {
        this.description = description;
        return this;
    }

    getIconType(): PocCardType {
        return this.iconType;
    }

    setIconType(iconType: PocCardType): POCCardModel {
        this.iconType = iconType;
        return this;
    }

    public getImageUrl(): string {
        let imgUrl: string = '';
        switch (this.iconType) {
            case PocCardIconType.performance:
                imgUrl = '/assets/images/performance.png';
                break;

            case PocCardIconType.inFuture:
                imgUrl = '/assets/images/in-future.jpg';
                break;

            default:
                imgUrl = '/assets/images/common-category.png';
                break;

        }
        return imgUrl;
    }

    public getPocUrl(): string {
        return this.pocUrl;
    }

    public setPocUrl(pocUrl: string): POCCardModel {
        this.pocUrl = pocUrl;
        return this;
    }
}
