import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlLink'
})
export class HTMLLinkPipe implements PipeTransform {
    transform(val: string, params?: string[]): string {
        if (!val) {
            return val;
        }

        // get all values between [[ and ]]
        const transformableValues: string[] = val.match(/\[\[(.*?)\]\]/g);
        if (!transformableValues || transformableValues.length === 0) {
            return val;
        }

        let transformedText: string = val + '';
        transformableValues.map(linkText => {
            const linkInfo: string[] = linkText.replace(/[\[\]]/g, '').split(',');
            const transformedLinkText: string = `<a href=${linkInfo[1]}>${linkInfo[0]}</a>`;
            transformedText = transformedText.replace(linkText, transformedLinkText);
            return linkText;
        });

        return transformedText ? transformedText : val;
    }
}
