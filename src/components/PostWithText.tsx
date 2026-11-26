import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import type { TextPost } from '@/types/posts';

type Props = {
  post: TextPost;
};

export function PostWithText({ post }: Props) {
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
          <Text style={styles.organizationName}>{post.organizationName}</Text>
          <Text style={styles.publishedDate}>{post.date}</Text>
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
  organizationName: {
    fontSize: 14,
    color: colors.apples_tråkiga_standardblå,
  },
  publishedDate: {
    fontSize: 14,
    color: colors.supersvart,
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
});
