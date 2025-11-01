import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './message-bubble.html',
  styleUrl: './message-bubble.css',
})
export class MessageBubble {
  sender = input<string>(''); // 'You' or other sender name
  content = input<string>('');
  timestamp = input<Date>(new Date());
}
