import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CONSTANTS } from '../constants';
import { GrantRequest } from '../models/grant-request.model';
import { Grant } from '../models/grant.model';
import { Toast } from '../models/toast.model';
import { GrantService } from '../services/grant.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-request-grant',
  templateUrl: './request-grant.component.html',
  styleUrls: ['./request-grant.component.scss']
})
export class RequestGrantComponent implements OnInit {
  @Input() grant: Grant;
  @Output() singnedInEmit = new EventEmitter();

  request: GrantRequest

  constructor(private grantService: GrantService,
    private toastService: ToastService) { 
    this.grant = new Grant();
    this.request = new GrantRequest();
  }

  ngOnInit(): void {
    console.log(this.grant);
    this.request = new GrantRequest();
  }

  sendRequest(){
    this.request.grant_id = this.grant.grant_id;
    this.grantService.SendRequest(this.request).then((result) => {
      if(result === CONSTANTS.success){
        let toastModel: Toast = { title: 'Request Send', message: 'Request send succesfuly', colour: CONSTANTS.blueColour, show:'show'};
        this.toastService.sendToastEvent(toastModel);
        this.singnedInEmit.emit({ send: true });
      }
      else{
        let toastModel: Toast = { title: 'Request Failed', message: 'Soemthing went wrong', colour: CONSTANTS.redColour, show:'show'};
        this.toastService.sendToastEvent(toastModel);}
        this.singnedInEmit.emit({ send: false });
    }).catch(() => {
      let toastModel: Toast = { title: 'Request Failed', message: 'Request send failed', colour: CONSTANTS.redColour, show:'show'};
      this.toastService.sendToastEvent(toastModel);
      this.singnedInEmit.emit({ send: false });
    });    
  }
}
