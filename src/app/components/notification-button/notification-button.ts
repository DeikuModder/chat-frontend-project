import { Component, signal } from '@angular/core';
import { NotificationMessage } from '../../../type';

@Component({
  selector: 'app-notification-button',
  imports: [],
  standalone: true,
  templateUrl: './notification-button.html',
  styleUrl: './notification-button.css',
})
export class NotificationButton {
  isPopUpOpen = signal<boolean>(false);

  togglePopUp() {
    this.isPopUpOpen.update((v) => !v);
  }

  notifications: NotificationMessage[] = [
    { id: 1, message: 'New message from Alice', timestamp: '2 mins ago', read: false },
    { id: 2, message: 'Meeting at 3 PM', timestamp: '1 hour ago', read: false },
    { id: 3, message: 'Server downtime scheduled', timestamp: 'Yesterday', read: true },
  ];

  unreadNotifications: NotificationMessage[] = this.notifications.filter((n) => !n.read);

  readNotifications: NotificationMessage[] = this.notifications.filter((n) => n.read);

  // Mock up function while not connected to backend
  markAsRead(notification: NotificationMessage) {
    notification.read = true;
    this.unreadNotifications = this.notifications.filter((n) => !n.read);
    this.readNotifications = this.notifications.filter((n) => n.read);
  }

  get unreadCount(): string {
    return this.notifications
      .filter((n) => !n.read)
      .length.toString()
      .trim();
  }
}
