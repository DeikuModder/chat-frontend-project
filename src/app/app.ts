import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomHeader } from './components/custom-header/custom-header';
import { ChatSidebar } from './components/chat-sidebar/chat-sidebar';
import { ConversationBox } from './components/conversation-box/conversation-box';
import { Chat } from '../type';
import { CommonModule } from '@angular/common';
import { CustomCursor } from './components/custom-cursor/custom-cursor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomHeader, ChatSidebar, ConversationBox, CommonModule, CustomCursor],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('chat-frontend-project');

  chatInfo = signal<Chat | null>(null);
  sidebarCollapsed = signal(false);

  selectChatMessages(input: Chat) {
    this.chatInfo.set(input);
  }

  onSidebarCollapsed(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
