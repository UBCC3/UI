import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-structure',
    templateUrl: './edit-structure-container.component.html',
    styleUrls: ['./edit-structure-container.component.scss'],
})
export class EditStructureContainerComponent implements OnInit {
    file!: File;
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
