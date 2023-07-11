import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ContainerComponent],
    imports: [CommonModule, RouterModule],
    exports: [ContainerComponent],
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule?: CoreModule
    ) {
        if (parentModule) throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
}
