import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditStructureContainerComponent } from './container/edit-structure-container.component';

const routes: Routes = [
    {
        path: '',
        component: EditStructureContainerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditStructureRoutingModule {}
