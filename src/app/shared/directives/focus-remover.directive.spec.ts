import { ElementRef } from '@angular/core';
import { FocusRemoverDirective } from './focus-remover.directive';

describe('FocusRemoverDirective', () => {
    it('should create an instance', () => {
        const mockElementRef: ElementRef = {} as ElementRef;
        const directive = new FocusRemoverDirective(mockElementRef);
        expect(directive).toBeTruthy();
    });
});
