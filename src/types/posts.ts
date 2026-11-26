export type PostBase = {
  id: string;
  date: string;
  authorName: string;
  organizationName: string;
  authorAvatarUrl: string | null;
  text: string;
};

export type TextPost = PostBase & {
  type: 'text';
};

export type PicturePost = PostBase & {
  type: 'picture';
  imageUrl: string;
};

export type EventPost = PostBase & {
  type: 'event';
  time: string;
  eventDate: string;
  location: string;
};

export type Post = TextPost | PicturePost | EventPost;
