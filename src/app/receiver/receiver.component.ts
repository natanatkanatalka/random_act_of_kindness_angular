import {Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ActivatedRoute} from '@angular/router';
import {
    DomSanitizer
} from '@angular/platform-browser';
import {Receiver} from '../../receiver';
import {environment} from '../../environments/environment';


@Component({
    selector: 'app-receiver',
    templateUrl: './receiver.component.html',
    styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

    constructor(private usersService: UsersService, private route: ActivatedRoute, public sanitization: DomSanitizer) {
    }

    receiver: Receiver;

    ngOnInit() {
        this.receiver = this.route.snapshot.data.receiver;
        // .subscribe(data => {}, err => console.log(err));
        console.log(this.receiver);
    }

}
