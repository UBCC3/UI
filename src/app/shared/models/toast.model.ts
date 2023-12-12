import { ToastType } from './toast-type.enum';

export interface Toast {
    id?: string;
    type: ToastType;
    message?: string;
}
