import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})

export class ToastService {

  constructor() { }

  private subject = new Subject<Toast>();

  sendToastEvent(toastModel: Toast){
    this.subject.next(toastModel);
  }

  getToastEvent(): Observable<any>{
    return this.subject.asObservable();
  }
}
