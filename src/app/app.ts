import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomHeader } from './components/custom-header/custom-header';
import { ChatSidebar } from './components/chat-sidebar/chat-sidebar';
import { ConversationBox } from './components/conversation-box/conversation-box';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomHeader, ChatSidebar, ConversationBox],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('chat-frontend-project');
}
