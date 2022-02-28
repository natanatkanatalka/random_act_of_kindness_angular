import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {
    Ng4FilesStatus,
    Ng4FilesSelected
} from '../../ng4-files';

@Component({
    selector: 'app-site-header',
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

    messages: string[];

    constructor(private  usersService: UsersService) {
    }

    public selectedFiles;

    public filesSelect(selectedFiles: Ng4FilesSelected): void {
        if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
            this.selectedFiles = selectedFiles.status;
            return;

            // Handle error statuses here
        }

        this.selectedFiles = selectedFiles.files;

        this.usersService.upload(this.selectedFiles[0]).subscribe(data => {
            this.messages = data.message;
            setTimeout(() => this.messages = null, 5000);
        });
    }

    sendMails(): void {
        this.usersService.sendAllMails().subscribe(data => {
            this.messages = [];
            this.messages.push(data.message);
        });
    }
    logout(): void {
        localStorage.removeItem('access_token');
    }

    onNotify(message: string): void {
        alert(message);
    }

    ngOnInit() {
    }

}
