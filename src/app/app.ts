import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomHeader } from './components/custom-header/custom-header';
import { ChatSidebar } from './components/chat-sidebar/chat-sidebar';
import { ConversationBox } from './components/conversation-box/conversation-box';
import { ChatMessage } from '../type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomHeader, ChatSidebar, ConversationBox, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('chat-frontend-project');

  messages = signal<ChatMessage[]>([]);

  selectChatMessages(messages: ChatMessage[]) {
    this.messages.set(messages);
  }
}
