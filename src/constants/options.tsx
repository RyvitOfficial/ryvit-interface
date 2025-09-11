import {
  EventList,
  Function,
  Home,
  SmartContract,
  TTL,
  Wallet,
} from '@/assets';
import { ContractMeta } from '@/types';

export const navItems = [
  { name: 'Dashboard', href: '/home', icon: <Home /> },
  { name: 'Contracts', href: '/contracts', icon: <SmartContract /> },
  {
    name: 'Event',
    href: '/event',
    icon: <EventList />,
  },
  {
    name: 'TTL Manager',
    href: '/ttl',
    icon: <TTL />,
  },
  {
    name: 'Function',
    href: '/function',
    icon: <Function />,
  },
  { name: 'Wallet', href: '/wallet', icon: <Wallet /> },
  // { name: 'Activities', href: '/dashboard/activities', icon: <Activity /> },
  // { name: 'Settings', href: '/dashboard/settings', icon: <Setting /> },
];

export const contractsOptions = [
  {
    label: 'Fluxity',
    value: 'GAXPZRKDJY4X4VHN3GC2YPRBAM7CRGB3H64R3TMVFUUYIVUF2UTBOY4B',
  },
  {
    label: 'Stellar',
    value: 'GALWDLGIKUZRHKPAQBIEXUSF2RWHDTWYZ4BWTUAQYXU6O364RSWVPOOL',
  },
  {
    label: 'Soroban',
    value: 'GC5AACPBG5THFS35G4US3WQEFZAQ75E5UCD3TXVXLGBP4L5YGSAHAR85',
  },
];

export const MOCK_CONTRACTS: ContractMeta[] = [
  {
    id: 'fluxity',
    label: 'GAXPZRKDJY4X4VHN3GC2YPRBAM7CRGB3H64R3TMVFUUYIVUF2UTBOY4B',
    functions: [
      {
        name: 'create-lockup',
        description: 'Creates a new time-locked position',
        inputs: [
          {
            name: 'amount',
            label: 'amount',
            type: 'u128',
            placeholder: 'Enter amount',
            required: true,
          },
          {
            name: 'token',
            label: 'token',
            type: 'address',
            placeholder: 'Token address',
            required: true,
          },
          {
            name: 'receiver',
            label: 'receiver',
            type: 'address',
            placeholder: 'Receiver address',
            required: true,
          },
          {
            name: 'rate',
            label: 'rate',
            type: 'u64',
            placeholder: 'Rate time',
            required: true,
          },
        ],
      },
      {
        name: 'last-lockup',
        description: 'Reads the last created lockup id',
        inputs: [],
      },
      {
        name: 'withdraw',
        description: 'Withdraw from an existing lockup',
        inputs: [
          {
            name: 'lockup_id',
            label: 'lockup_id',
            type: 'u64',
            placeholder: 'Lockup id',
            required: true,
          },
          {
            name: 'amount',
            label: 'amount',
            type: 'u128',
            placeholder: 'Withdraw amount',
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: 'stellar',
    label: 'GALWDLGIKUZRHKPAQBIEXUSF2RWHDTWYZ4BWTUAQYXU6O364RSWVPOOL',
    functions: [
      {
        name: 'balance',
        inputs: [
          {
            name: 'account',
            label: 'account',
            type: 'address',
            placeholder: 'Account address',
            required: true,
          },
        ],
      },
      {
        name: 'transfer',
        inputs: [
          {
            name: 'from',
            label: 'from',
            type: 'address',
            placeholder: 'Sender address',
            required: true,
          },
          {
            name: 'to',
            label: 'to',
            type: 'address',
            placeholder: 'Receiver address',
            required: true,
          },
          {
            name: 'amount',
            label: 'amount',
            type: 'u128',
            placeholder: 'Amount',
            required: true,
          },
        ],
      },
    ],
  },
];

export const contracts = [
  {
    name: 'Wagent',
    address: 'GAXPZRKDJY4X4VHN3GC2YPRBAM7CRGB3H64R3TMVFUUYIVUF2UTBOY4B',
    functions: 8,
    events: 3,
    ttl: '15d',
    status: 'active',
    network: 'testnet',
    addedDate: '2024-01-20',
    icon: '',
  },
  {
    name: 'Token DGS',
    address: 'GALWDLGIKUZRHKPAQBIEXUSF2RWHDTWYZ4BWTUAQYXU6O364RSWVPOOL',
    functions: 4,
    events: 2,
    ttl: '57d',
    status: 'active',
    network: 'testnet',
    addedDate: '2024-01-20',
    icon: '',
  },
  {
    name: 'FLuxity',
    address: 'GC5AACPBG5THFS35G4US3WQEFZAQ75E5UCD3TXVXLGBP4L5YGSAHAR75',
    functions: 12,
    events: 5,
    ttl: '120d',
    status: 'inactive',
    network: 'mainnet',
    addedDate: '2024-01-15',
    icon: '',
  },
  {
    name: 'ABS',
    address: 'GC5AACPBG5THFS35G4US3WQEFZAQ75E5UCD3TXVXLGBP4L5YGSAHAR85',
    functions: 12,
    events: 5,
    ttl: '120d',
    status: 'inactive',
    network: 'mainnet',
    addedDate: '2024-01-15',
    icon: '',
  },
];
