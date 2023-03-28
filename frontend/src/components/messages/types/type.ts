export type Filter = {
  id: number;
  title: string;
};

export type Platform = {
  id: number;
  name: string;
  code: 'tg' | 'vk' | 'yt' | 'ig' | 'ok';
};

export type Message = {
  id: number;
  date: string;
  title: string;
  content: string;
  imageUrl: string;
  filters: Filter[];
  platform: Platform;
  isRead: boolean;
  reaction: 'positive' | 'negative' | 'neutral';
  isNew: boolean;
};

export type State = {
  messages: Message[];
};

export type MessageId = Message['id'];

export type Filters = {
  isRead?: boolean;
  reaction?: 'positive' | 'negative';
  sortingField?: 'date';
  sortingDirection?: 'asc' | 'desc';
  platformCode?: 'tg' | 'vk' | 'yt' | 'ig' | 'ok';
  dateFrom?: string;
  dateTo?: string;
  pageNumber: number;
  pageSize: number;
};

export interface MessageCardProps {
  message: Message;
}

export type UpdatedMessageFields = {
  isNew?: boolean;
};
