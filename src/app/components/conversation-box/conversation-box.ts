import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBubble } from '../message-bubble/message-bubble';
import { ConversationBoxInput } from '../../../type';

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

  desiredInput = input<ConversationBoxInput | null>(null);

  get messages() {
    return this.desiredInput()?.messages ?? [];
  }

  get isGroupChat() {
    return this.desiredInput()?.isGroupChat ?? false;
  }
}
