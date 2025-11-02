import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { UserAvatar } from '../user-avatar/user-avatar';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [DatePipe, CommonModule, UserAvatar],
  templateUrl: './message-bubble.html',
  styleUrl: './message-bubble.css',
})
export class MessageBubble {
  sender = input<string>(''); // 'You' or other sender name
  content = input<string>('');
  timestamp = input<Date>(new Date());
  isGroupChat = input<boolean>(false);
  avatarUrl = input<string>('');
}
