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

export const contractsOptions = [
  {
    label: 'Fluxity Contract (CD4VOKXNRC......K6EMBOEE75)',
    value: 'GC5AACPBG5THFS35G4US3WQEFZAQ75E5UCD3TXVXLGBP4L5YGSAHAR75',
  },
  {
    label: 'Stellar Contract (CD4VOKXNRC......K6EMBOEE23)',
    value: 'GC5AACPBG5THFS35G4US3WQEFerQ75E5UCD3TXVXLGBP4L5YGSAHAR95',
  },
  {
    label: 'Soroban Contract (CD4VOKXNRC......K6EMBOEE98)',
    value: 'GC5AACPBG5THFS35G4US3WQEFZAQ75E5UCD3TXVXLGBP4L5YGSAHAR85',
  },
];
