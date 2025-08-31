import {
  Activity,
  EventList,
  File,
  Home,
  Setting,
  SmartContract,
  TTL,
  Wallet,
} from '@/assets';

export const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <Home /> },
  { name: 'Contracts', href: '/contracts', icon: <SmartContract /> },
  {
    name: 'Event',
    href: '/contracts/event',
    icon: <EventList />,
  },
  {
    name: 'TTL Manager',
    href: '/contracts/ttl',
    icon: <TTL />,
  },
  { name: 'Activities', href: '/dashboard/activities', icon: <Activity /> },
  { name: 'Wallet', href: '/dashboard/wallet', icon: <Wallet /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <Setting /> },
];
