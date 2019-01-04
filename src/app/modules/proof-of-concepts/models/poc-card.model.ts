import { POCCardModelInterface } from './interfaces/poc-card-models.interface';
// import { PocCardType, PocCardIconType } from './types/proof-of-concepts.types';

export class POCCardModel implements POCCardModelInterface {
    private title: string;
    private subTitle: string;
    private description: string;
    private thumbnailImageUrl: string;
    private pocUrl: string;

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): POCCardModel {
        this.title = title;
        return this;
    }

    public getSubTitle(): string {
        return this.subTitle;
    }

    public setsubTitle(subTitle: string): POCCardModel {
        this.subTitle = subTitle;
        return this;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): POCCardModel {
        this.description = description;
        return this;
    }

    public getThumbnailImageUrl(): string {
        return this.thumbnailImageUrl;
    }

    public setThumbnailImageUrl(thumbnailImageUrl: string): POCCardModel {
        this.thumbnailImageUrl = thumbnailImageUrl;
        return this;
    }

    public getPocUrl(): string {
        return this.pocUrl;
    }

    public setPocUrl(pocUrl: string): POCCardModel {
        this.pocUrl = pocUrl;
        return this;
    }
}
