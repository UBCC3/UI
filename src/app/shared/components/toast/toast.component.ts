import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastType } from '../../models/toast-type.enum';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../models/toast.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
    toasts: Toast[];
    type: typeof ToastType;

    private subscriptions: Subscription;
    constructor(private toastService: ToastService) {
        this.subscriptions = new Subscription();
        this.type = ToastType;
        this.toasts = [];
    }

    ngOnInit(): void {
        this.listenForToasts();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    listenForToasts(): void {
        this.subscriptions.add(
            this.toastService.getToasts$().subscribe((toast) => {
                if (!toast.id) toast.id = uuidv4();
                this.toasts.unshift(toast);
                if (toast.type === ToastType.Success) setTimeout(() => this.dismissToast(toast?.id as string), 3000);
            })
        );
    }

    dismissToast(id: string): void {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
    }
}
