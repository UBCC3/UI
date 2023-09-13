import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appFocusRemover]',
})
export class FocusRemoverDirective {
    constructor(private elementRef: ElementRef) {}

    @HostListener('click') onClick() {
        this.elementRef.nativeElement.parentElement.classList.toggle('dropdown-open');
        setTimeout(() => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }, 100);
    }
}
