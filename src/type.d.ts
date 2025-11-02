export interface ChatMessage {
  id: string | number;
  sender: string; // e.g., 'You' or a username
  content: string;
  timestamp: Date;
  avatarUrl?: string;
}

export interface Chat {
  id: string | number;
  title: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  avatarUrl?: string;
  isGroup?: boolean;
  members?: { username: string; color: string }[]; // usernames of group members
  messages?: ChatMessage[];
}
