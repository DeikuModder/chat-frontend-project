import { Component, input } from '@angular/core';
import { ChatMessage } from '../../../type';
import { CommonModule } from '@angular/common';
import { MessageBubble } from '../message-bubble/message-bubble';

@Component({
  selector: 'app-conversation-box',
  standalone: true,
  imports: [CommonModule, MessageBubble],
  templateUrl: './conversation-box.html',
  styleUrl: './conversation-box.css',
})
export class ConversationBox {
  // When switching to actual fetching it will use the id for fetching the conversation
  // chatId = input<string | number | null>(null);

  messages = input<ChatMessage[] | null>(null);
}
