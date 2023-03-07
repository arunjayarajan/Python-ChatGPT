import { Component, Input, OnInit } from '@angular/core';
import { CONSTANTS } from '../constants';
import { GrantRequest } from '../models/grant-request.model';
import { Toast } from '../models/toast.model';
import { RequestService } from '../services/request.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-pending-request-list',
  templateUrl: './pending-request-list.component.html',
  styleUrls: ['./pending-request-list.component.scss']
})
export class PendingRequestListComponent implements OnInit {
  
  loading: boolean = false;
  requests: GrantRequest[] = [];
  selectedRequest: GrantRequest = new GrantRequest();
  currentFilter: string = "All";
  constructor(private requestService: RequestService,
    private toastService: ToastService) { 
      
    }

    applyRequestPop = {
      size: '70',
      show: false
    };
  

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(status: string = this.currentFilter) {
    this.loading = true;
    this.requestService.ListPendingRequests(status).subscribe({
      next: (userRequests: GrantRequest[]) => {
        this.requests = userRequests;
        this.loading = false;
      },
      error: (error) => {
        console.log("Failed to fetch requests", error);
        let toastModel: Toast = { title: 'Error', message: 'Failed to fetch requests', colour: CONSTANTS.redColour, show:'show'};
        this.toastService.sendToastEvent(toastModel);
        this.loading = false;
      }
    });
  }

  updateRequest(e: any){
    this.applyRequestPop.show = false;
    this.getRequests(this.currentFilter);
  }

  updateRequestShow(request: GrantRequest){
    this.selectedRequest = request;
    this.applyRequestPop.show = true;
  }

  filterOnApproved(e: any){
    this.currentFilter = "Approved";
    this.getRequests(this.currentFilter);
  }

  filterOnRejected(e: any){
    this.currentFilter = "Rejected";
    this.getRequests(this.currentFilter);
  }

  filterOnPending(e: any){
    this.currentFilter = "Pending";
    this.getRequests(this.currentFilter);
  }
}
