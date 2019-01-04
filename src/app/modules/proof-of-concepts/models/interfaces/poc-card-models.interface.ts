// import { PocCardType } from '../types/proof-of-concepts.types';

export interface POCCardModelInterface {
    getTitle(): string;
    setTitle(title: string): POCCardModelInterface;

    getSubTitle(): string;
    setsubTitle(subTitle: string): POCCardModelInterface;

    getDescription(): string;
    setDescription(description: string): POCCardModelInterface;

    getThumbnailImageUrl(): string;
    setThumbnailImageUrl(thumbnailImageUrl: string): POCCardModelInterface;

    getPocUrl(): string;
    setPocUrl(pocUrl: string): POCCardModelInterface;
}


