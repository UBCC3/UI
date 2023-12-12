import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { EditStructureContainerComponent } from './container/edit-structure-container.component';
import { EditStructureRoutingModule } from './edit-structure-routing.module';

@NgModule({
    declarations: [EditStructureContainerComponent],
    imports: [CommonModule, EditStructureRoutingModule, SharedModule],
})
export class EditStructureModule {}
