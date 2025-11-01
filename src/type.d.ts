export interface ChatMessage {
  id: string | number;
  sender: string; // e.g., 'You' or a username
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string | number;
  title: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  avatarUrl?: string;
  messages?: ChatMessage[];
}
