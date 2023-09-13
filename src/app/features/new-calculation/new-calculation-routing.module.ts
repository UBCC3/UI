import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCalculationComponent } from './container/new-calculation.component';

const routes: Routes = [
    {
        path: '',
        component: NewCalculationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewCalculationRoutingModule {}
