import { EventCard } from '@/components/EventPost';
import { PostWithPicture } from '@/components/PostWithPicture';
import { PostWithText } from '@/components/PostWithText';
import type { Post } from '@/types/posts';

export function PostRenderer({ post }: { post: Post }) {
  switch (post.type) {
    case 'text':
      return <PostWithText post={post} />;
    case 'picture':
      return <PostWithPicture post={post} />;
    case 'event':
      return <EventCard post={post} />;
  }
}
