import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  @Input() errors: string[];
  constructor() { }

  ngOnInit() {
  }

}
