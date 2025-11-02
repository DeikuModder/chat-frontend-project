import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  imports: [],
  standalone: true,
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.css',
})
export class UserAvatar {
  avatarUrl = input<string>('');
  title = input<string>('');
}
