import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultContainerComponent } from './container/result-container.component';

const routes: Routes = [
    {
        path: '',
        component: ResultContainerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ResultRoutingModule {}
