import { Component, Input, OnInit } from '@angular/core';
import { GrantRequest } from '../models/grant-request.model';
import { Grant } from '../models/grant.model';

@Component({
  selector: 'app-request-grant',
  templateUrl: './request-grant.component.html',
  styleUrls: ['./request-grant.component.scss']
})
export class RequestGrantComponent implements OnInit {
  @Input() grant: Grant;

  request: GrantRequest

  constructor() { 
    this.grant = new Grant();
    this.request = new GrantRequest();
  }

  ngOnInit(): void {
    console.log(this.grant);
    this.request = new GrantRequest();
  }

  sendRequest(){
    this.request.grantId = this.grant.id;
    console.log(this.request);
  }
}
