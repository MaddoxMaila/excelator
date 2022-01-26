import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(user: User): unknown {
    return `${user.getName().substring(0, 1)}${user.getSurname().substring(0, 1)}`.toUpperCase()
  }

}
