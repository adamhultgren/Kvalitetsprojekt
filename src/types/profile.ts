export type Profile = {
  name: string;
  bio: string[];
  interests: string[];
  avatarUrl: string | null;
  bannerUrl: string | null;
};

export type Post = {
  id: string;
  authorName: string;
  authorAvatarUrl: string | null;
  text: string;
  date: string;
  time: string;
  location: string;
};
