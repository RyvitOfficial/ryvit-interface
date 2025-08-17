import { Activity, EventList, File, Home, Setting, Wallet } from '@/assets';

export const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <Home /> },
  { name: 'Contracts', href: '/dashboard/contracts', icon: <File /> },
  {
    name: 'Event',
    href: '/dashboard/event',
    icon: <EventList />,
  },
  { name: 'Activities', href: '/dashboard/activities', icon: <Activity /> },
  { name: 'Wallet', href: '/dashboard/wallet', icon: <Wallet /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <Setting /> },
];
