import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditStructureComponent } from './edit-structure.component';

const routes: Routes = [
    {
        path: '',
        component: EditStructureComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditStructureRoutingModule {}
