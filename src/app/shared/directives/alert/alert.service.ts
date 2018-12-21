import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';


@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }

    handleException(exception: Error, moduleName: string, componentName: string, methodName: string, keepAfterNavigationChange = false) {
        const errorMessage: string =
            `Error occured in method >>> ${methodName} in component >>> ${componentName} in module >>> ${moduleName}
            ${exception.stack}`;

        console.error(errorMessage);

        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: errorMessage });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
