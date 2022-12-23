import { Component, Input, OnInit } from '@angular/core';
import { Grant } from '../models/grant.model';

@Component({
  selector: 'app-apply-grant',
  templateUrl: './apply-grant.component.html',
  styleUrls: ['./apply-grant.component.scss']
})
export class ApplyGrantComponent implements OnInit {
  @Input() grant: Grant;
  constructor() { 
    this.grant = new Grant();
  }

  ngOnInit(): void {
    console.log(this.grant);
  }

}
