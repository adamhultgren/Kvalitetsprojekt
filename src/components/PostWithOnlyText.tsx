import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import type { Post } from '@/types/profile';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.authorRow}>
        {post.authorAvatarUrl ? (
          <Image source={{ uri: post.authorAvatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]} />
        )}
        <View>
          <Text style={styles.authorName}>{post.authorName}</Text>
        </View>
      </View>

      <Text style={styles.text}>{post.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.jättevit,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    backgroundColor: colors.bakgrundsgrå,
  },
  authorName: {
    fontSize: 18,
  },
  authorUsername: {
    fontSize: 16,
    color: colors.apples_tråkiga_standardblå,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 24,
  },
  metaBold: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.supersvart,
  },
});
