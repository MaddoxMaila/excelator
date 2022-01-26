import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {

  @Input() user: User
  color: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.color = this.getRandomColor()

  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}
