import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { EditStructureComponent } from './edit-structure.component';
import { EditStructureRoutingModule } from './edit-structure-routing.module';

@NgModule({
    declarations: [EditStructureComponent],
    imports: [CommonModule, EditStructureRoutingModule, SharedModule],
})
export class EditStructureModule {}
