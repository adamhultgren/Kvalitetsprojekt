import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { colors } from '../../constants/colors';

export default function TabLayout() {
  return (
    <NativeTabs tintColor={colors.apples_tråkiga_standardblå}>
      <NativeTabs.Trigger name="discover">
        <NativeTabs.Trigger.Icon sf="binoculars.fill" />
        <NativeTabs.Trigger.Label>Utforska</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="feed">
        <NativeTabs.Trigger.Icon sf="7.calendar" />
        <NativeTabs.Trigger.Label>Flöde</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf="person.fill" />
        <NativeTabs.Trigger.Label>Profil</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Icon sf="magnifyingglass" />
        <NativeTabs.Trigger.Label>Sök</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
