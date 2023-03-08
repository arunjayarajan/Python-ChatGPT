import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CONSTANTS } from '../constants';
import { GrantRequest } from '../models/grant-request.model';
import { Toast } from '../models/toast.model';
import { RequestService } from '../services/request.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-update-request-grant',
  templateUrl: './update-request-grant.component.html',
  styleUrls: ['./update-request-grant.component.scss']
})
export class UpdateRequestGrantComponent implements OnInit {
  @Input() request: GrantRequest;
  @Output() requestUpdateEmit = new EventEmitter();
  constructor(private requestService: RequestService,
    private toastService: ToastService) { 
    this.request = new GrantRequest();
  }

  ngOnInit(): void {
  }

  sendUpdate(status: string){
    this.request.status = status;
    this.requestService.UpdateRequest(this.request).then((result) => {
      if(result === CONSTANTS.success){
        let toastModel: Toast = { title: 'Request Send', message: 'Request updated succesfuly', colour: CONSTANTS.blueColour, show:'show'};
        this.toastService.sendToastEvent(toastModel);
        this.requestUpdateEmit.emit({ send: true });
      }
      else{
        let toastModel: Toast = { title: 'Request Failed', message: 'Soemthing went wrong', colour: CONSTANTS.redColour, show:'show'};
        this.toastService.sendToastEvent(toastModel);}
        this.requestUpdateEmit.emit({ send: false });
    }).catch(() => {
      let toastModel: Toast = { title: 'Request Failed', message: 'Request update failed', colour: CONSTANTS.redColour, show:'show'};
      this.toastService.sendToastEvent(toastModel);
      this.requestUpdateEmit.emit({ send: false });
    }); 
  }
}
