export interface Member {
  userId: string;
  role: string;
  _id: string;
  username: string;
}

// Define Channel type
export interface Channel {
  _id: string;
  name: string;
  created_by: string;
  members: Member[];
  isPrivate: boolean;
  __v: number;
  invitedUsers: any[];
}

// Define Pagination type
export interface Pagination {
  totalChannels: number;
  currentPage: number;
  totalPages: number;
}

// Define ChannelsResponse type
export interface ChannelsResponse {
  success: boolean;
  channels: Channel[];
  pagination: Pagination;
}
export type NotificationResponse = {
  _id: string;
  userId: string;
  message: string;
  channelId: string;
  isRead: false;
  createdAt: string;
  __v: number;
};

export interface MemberResponse {
  success: boolean;
  channels: Channel;
}
