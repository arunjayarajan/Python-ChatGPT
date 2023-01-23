import { Component, Input, OnInit } from '@angular/core';
import { CONSTANTS } from '../constants';
import { Toast } from '../models/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() toastModel: Toast;
  
  toastShow: string = 'hide';
  toastColour: string = CONSTANTS.blueColour;
  toastTitle: string = '';
  toastMessage: string = '';
  
  constructor() { 
    this.toastModel = {
      show: 'hide',
      colour: CONSTANTS.blueColour,
      title: '',
      message: ''
    };
  }

  ngOnInit(): void {
  }
}
