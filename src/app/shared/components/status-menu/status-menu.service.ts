import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StatusMenuService {
    private statusMenuEmit = new BehaviorSubject<any>(null);

    constructor() {}

    emitStatusMenuEvent(data?: any): void {
        this.statusMenuEmit.next(data);
    }

    getStatusMenuEvent(): Observable<any> {
        return this.statusMenuEmit.asObservable();
    }
}
