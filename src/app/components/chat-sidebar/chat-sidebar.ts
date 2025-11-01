import { Component, input, computed, signal, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chat, ChatMessage } from '../../../type';
@Component({
  selector: 'app-chat-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chat-sidebar.html',
  styleUrl: './chat-sidebar.css',
})
export class ChatSidebar {
  // Collapsed state
  readonly collapsed = signal(false);

  readonly selectChat = output<ChatMessage[]>();

  constructor() {
    // Determine if sidebar is collapsed: saved preference or system setting
    try {
      const isCollapsed =
        typeof localStorage !== 'undefined' ? localStorage.getItem('isCollapsed') : null;

      const status = isCollapsed === 'true' ? true : false;

      this.collapsed.set(status);
    } catch {
      // In SSR or restricted environments, no-op
    }
  }

  // Provide chats from parent if available; otherwise fall back to demo data
  chats = input<Chat[] | null>([
    {
      id: 1,
      title: 'General',
      lastMessage: 'Let’s meet at 10',
      time: '09:42',
      unread: 2,
      messages: [
        {
          id: 'm1',
          sender: 'Alex',
          content: 'Morning team! Any blockers today?',
          timestamp: new Date(),
        },
        {
          id: 'm2',
          sender: 'You',
          content: 'All good here. Standup at 10?',
          timestamp: new Date(),
        },
        { id: 'm3', sender: 'Sam', content: 'Works for me 👍', timestamp: new Date() },
      ],
    },
    {
      id: 2,
      title: 'Design Team',
      lastMessage: 'New mockups ready',
      time: 'Yesterday',
      unread: 0,
      messages: [
        {
          id: 'm1',
          sender: 'Nina',
          content: 'Pushed the new dashboard mockups.',
          timestamp: new Date(),
        },
        {
          id: 'm2',
          sender: 'You',
          content: 'They look great! I’ll review comments today.',
          timestamp: new Date(),
        },
        {
          id: 'm3',
          sender: 'Nina',
          content: 'Thanks! Pay attention to the mobile header.',
          timestamp: new Date(),
        },
      ],
    },
    {
      id: 3,
      title: 'Project Alpha',
      lastMessage: 'Pushed latest changes',
      time: 'Mon',
      unread: 5,
      messages: [
        { id: 'm1', sender: 'You', content: 'API pagination is in the PR.', timestamp: new Date() },
        {
          id: 'm2',
          sender: 'Lee',
          content: 'Nice. I’ll test it with large datasets.',
          timestamp: new Date(),
        },
        {
          id: 'm3',
          sender: 'Alex',
          content: 'We may need caching for search results.',
          timestamp: new Date(),
        },
        {
          id: 'm4',
          sender: 'Lee',
          content: 'Agree. Will propose a strategy.',
          timestamp: new Date(),
        },
      ],
    },
    {
      id: 4,
      title: 'Support',
      lastMessage: 'Ticket #456 resolved',
      time: 'Sun',
      unread: 0,
      messages: [
        {
          id: 'm1',
          sender: 'Support Bot',
          content: 'Ticket #456 resolved: rate limit issue.',
          timestamp: new Date(),
        },
        {
          id: 'm2',
          sender: 'You',
          content: 'Confirmed. Customer acknowledged fix.',
          timestamp: new Date(),
        },
      ],
    },
  ]);

  // Reactive, always-an-array view of chats
  readonly chatsList = computed(() => this.chats() ?? []);

  // Derived: number of unread chats
  readonly totalUnread = computed(() =>
    this.chatsList().reduce((sum, c) => sum + (c.unread ?? 0), 0)
  );

  toggleCollapse() {
    this.collapsed.update((v) => !v);

    try {
      localStorage.setItem('isCollapsed', this.collapsed() ? 'true' : 'false');
    } catch {
      // ignore storage errors
    }
  }

  onSelectChat(chat: Chat) {
    this.selectChat.emit(chat.messages ?? []);
  }
}
