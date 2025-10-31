import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chat-sidebar.html',
  styleUrl: './chat-sidebar.css',
})
export class ChatSidebar {
  // Collapsed state
  readonly collapsed = signal(false);

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
  @Input() chats: Array<{
    id: string | number;
    title: string;
    lastMessage?: string;
    time?: string;
    unread?: number;
    avatarUrl?: string;
  }> = [
    { id: 1, title: 'General', lastMessage: 'Let’s meet at 10', time: '09:42', unread: 2 },
    { id: 2, title: 'Design Team', lastMessage: 'New mockups ready', time: 'Yesterday', unread: 0 },
    { id: 3, title: 'Project Alpha', lastMessage: 'Pushed latest changes', time: 'Mon', unread: 5 },
    { id: 4, title: 'Support', lastMessage: 'Ticket #456 resolved', time: 'Sun', unread: 0 },
  ];

  // Derived: number of unread chats
  readonly totalUnread = computed(() => this.chats.reduce((sum, c) => sum + (c.unread ?? 0), 0));

  toggleCollapse() {
    this.collapsed.update((v) => !v);

    try {
      localStorage.setItem('isCollapsed', this.collapsed() ? 'true' : 'false');
    } catch {
      // ignore storage errors
    }
  }
}
