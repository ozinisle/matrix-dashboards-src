import { Router } from '@angular/router';

export class MatrixUtilities {

    constructor(private router: Router) { }

    getAllActiveRoutes(printToConsole?: boolean) {
        const routes: string[] = [];
        for (let i = 0; i < this.router.config.length; i++) {
            const routePath: string = this.router.config[i].path;
            routes.push(routePath);
            if (printToConsole) {
                console.log(`${i} >> ${routePath}`);
            }
        }
    }
}