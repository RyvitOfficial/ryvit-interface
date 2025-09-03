import { SorobanType } from '@/types';

export function coerceByType(raw: string | boolean, t: SorobanType) {
  if (t === 'bool') return Boolean(raw);
  if (typeof raw !== 'string') return raw;
  switch (t) {
    case 'u32':
    case 'i32':
    case 'u64':
    case 'i64':
      return raw === '' ? null : Number(raw);
    case 'u128':
    case 'i128':
      return raw.trim();
    default:
      return raw.trim();
  }
}

export function errorFor(
  type: SorobanType,
  value: string | boolean,
): string | null {
  const v = typeof value === 'string' ? value.trim() : value;
  if (type === 'bool') return null;
  if (v === '' || v === undefined || v === null) return 'Required';
  if (['u32', 'i32', 'u64', 'i64'].includes(type)) {
    if (!/^[-]?\d+$/.test(String(v))) return 'Must be integer';
  }
  if (['u128', 'i128'].includes(type)) {
    if (!/^[-]?\d+$/.test(String(v))) return 'Big integer expected';
  }
  if (type === 'address' && !/^[A-Z0-9]{10,}$/.test(String(v))) {
    return 'Looks like an invalid address';
  }
  return null;
}
