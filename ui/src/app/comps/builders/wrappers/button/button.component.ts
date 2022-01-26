import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() class: string
  @Input() type: string
  @Input() loading: boolean
  @Input() click: () => void

  constructor() { }

  ngOnInit(): void {

    this.click ??= () => {}

  }

}
