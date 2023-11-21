import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-structure',
    templateUrl: './edit-structure.component.html',
    styleUrls: ['./edit-structure.component.scss'],
})
export class EditStructureComponent {
    file!: any;
    constructor(private route: ActivatedRoute) {}
    JSmolStyle = {
        width: '100vw',
        height: 'calc(100vh - 66.5px)',
    };

    ngOnInit(): void {
        this.route.paramMap.subscribe((param) => {
            this.file = history.state.file;
        });
    }
}
