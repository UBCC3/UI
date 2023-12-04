import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    toasts$: Subject<Toast>;
    constructor() {
        this.toasts$ = new Subject<Toast>();
    }

    getToasts$(): Observable<Toast> {
        return this.toasts$.asObservable();
    }

    toast(toast: Toast): void {
        this.toasts$.next(toast);
    }
}
