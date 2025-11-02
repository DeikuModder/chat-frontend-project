import { Component, computed, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBubble } from '../message-bubble/message-bubble';
import { Chat } from '../../../type';

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

  chatInfo = input<Chat | null>(null);

  get messages() {
    return this.chatInfo()?.messages ?? [];
  }

  get isGroupChat() {
    return this.chatInfo()?.isGroup ?? false;
  }

  get chatTitle() {
    return this.chatInfo()?.title ?? 'No Chat Selected';
  }

  get chatMemberCount() {
    return this.chatInfo()?.members?.length ?? 0;
  }

  readonly colorByUser = computed(
    () => new Map((this.chatInfo()?.members ?? []).map((m) => [m.username, m.color]))
  );

  getChatMemberColor(username: string) {
    const map = this.colorByUser();
    const color = map.get(username);
    // debugger; // uncomment to break in DevTools
    return color ?? '#000000';
  }
}
