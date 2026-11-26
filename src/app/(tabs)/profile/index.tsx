import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PostRenderer } from '@/components/PostRenderer';
import { colors } from '@/constants/colors';
import type { Post } from '@/types/posts';
import type { Profile } from '@/types/profile';

// Placeholder. Ersätt med funktion som hämtar från databasen sen
const PLACEHOLDER_PROFILE: Profile = {
  name: 'Namn Efternamn',
  bio: ['Min bio, android användare osv..'],
  interests: ['Intresse 1', 'Intresse 2', 'Intresse 3'],
  avatarUrl: null,
  bannerUrl: null,
};

// Placeholder. Ersätt med funktion som hämtar från databasen sen
const PLACEHOLDER_POSTS: Post[] = [
  {
    id: '1',
    type: 'text',
    authorName: 'Namn Efternamn',
    organizationName: 'Ensamhetsföreningen',
    authorAvatarUrl: null,
    text: 'Jag vill ha sällskap, kom och säg hej',
    date: '03 Nov. 2026',
  },

  {
    id: '2',
    type: 'event',
    authorName: 'Namn Efternamn',
    organizationName: 'Ensamhetsföreningen',
    authorAvatarUrl: null,
    text: 'Snälla det är inte försent än',
    date: '03 Nov. 2026',
    time: '12:00 - 16:00',
    eventDate: '12 Januari',
    location: 'Plats',
  },
];

export default function ProfileScreen() {
  const profile = PLACEHOLDER_PROFILE;
  const posts = PLACEHOLDER_POSTS;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.header}>
        {/* Hämta från databasen sen. Placeholder nu */}
        <Image
          source={
            profile.bannerUrl
              ? { uri: profile.bannerUrl }
              : require('@/assets/images/banner_placeholder.png')
          }
          style={styles.banner}
          resizeMode="cover"
        />
        <Pressable style={styles.settingsButton} accessibilityLabel="Inställningar">
          <Text style={styles.settingsIcon}></Text>
        </Pressable>
        {/* Hämta från databasen sen. Placeholder nu */}
        <Image
          source={
            profile.avatarUrl ? { uri: profile.avatarUrl } : require('@/assets/images/avatar.png')
          }
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.name}>{profile.name}</Text>

        <View style={styles.bio}>
          {profile.bio.map((line) => (
            <Text key={line} style={styles.bioLine}>
              {line}
            </Text>
          ))}
        </View>

        <Text style={styles.interestsTitle}>Intressen</Text>
        <View style={styles.chipRow}>
          {profile.interests.map((interest) => (
            <View key={interest} style={styles.chip}>
              <Text style={styles.chipText}>{interest}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Skapa kontakt</Text>
        </Pressable>
      </View>
      <View style={styles.divider} />
      <View style={styles.tabHeader}>
        <Text style={styles.tabTitle}>Inlägg</Text>
      </View>
      <View style={styles.postsHeader}>
        <Text style={styles.postsTitle}>Senaste inlägg</Text>
        {/*Implementera filtrering, tack <3 */}
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Filtrera</Text>
        </Pressable>
      </View>
      {posts.map((post) => (
        <PostRenderer key={post.id} post={post} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.bakgrundsgrå,
  },
  container: {
    paddingBottom: 120,
  },
  banner: {
    width: '100%',
    height: 175,
  },
  bannerPlaceholder: {
    backgroundColor: colors.jättevit,
  },
  settingsButton: {
    position: 'absolute',
    top: 48,
    right: 24,
  },
  settingsIcon: {
    fontSize: 28,
  },
  avatar: {
    position: 'absolute',
    left: 24,
    bottom: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.jättevit,
  },
  avatarPlaceholder: {
    backgroundColor: colors.bakgrundsgrå,
  },
  infoSection: {
    backgroundColor: colors.jättevit,
    paddingTop: 76,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
  },
  bio: {
    marginTop: 8,
  },
  bioLine: {
    fontSize: 16,
  },
  interestsTitle: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  chip: {
    backgroundColor: colors.bakgrundsgrå,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 18,
  },
  contactButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.bakgrundsgrå,
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 20,
  },
  contactButtonText: {
    fontSize: 20,
  },
  divider: {
    height: 24,
  },
  tabHeader: {
    backgroundColor: colors.jättevit,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  tabTitle: {
    alignSelf: 'flex-start',
    fontSize: 22,
    fontWeight: '700',
    color: colors.apples_tråkiga_standardblå,
    paddingBottom: 4,
    borderBottomWidth: 3,
    borderBottomColor: colors.apples_tråkiga_standardblå,
  },
  postsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.jättevit,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  filterButton: {
    backgroundColor: colors.bakgrundsgrå,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 16,
    color: colors.supersvart,
  },
});
