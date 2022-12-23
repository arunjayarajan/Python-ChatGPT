import { Component, Input, Output, EventEmitter } from '@angular/core';
export interface PopupData {
  size?: string;
  show: boolean;
  bodyStyle?: any;
}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
/**
 * @class PopupComponent - component class for showing the popup
 */
export class PopupComponent {
  @Output() close = new EventEmitter<boolean>();
  @Input() data: PopupData;

  constructor(){
    this.data =  {
      size: '75',
      show: false
    };
  }
/**
 * Method for toggle popup
 */
  popToggle() {
    this.data.show = false;
    this.close.emit(this.data.show);
  }
}
