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
  messages?: ChatMessage[];
}

export interface ConversationBoxInput {
  messages: ChatMessage[];
  isGroupChat: boolean;
}
