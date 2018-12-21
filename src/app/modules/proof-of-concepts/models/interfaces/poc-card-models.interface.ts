import { PocCardType } from '../types/proof-of-concepts.types';

export interface POCCardModelInterface {
    getTitle(): string;
    setTitle(title: string): POCCardModelInterface;

    getSubTitle(): string;
    setsubTitle(subTitle: string): POCCardModelInterface;

    getDescription(): string;
    setDescription(description: string): POCCardModelInterface;

    getIconType(): PocCardType;
    setIconType(iconType: PocCardType): POCCardModelInterface;

    getImageUrl(): string;

    getPocUrl(): string;
    setPocUrl(pocUrl: string): POCCardModelInterface;
}


