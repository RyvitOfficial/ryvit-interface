'use client';

import React from 'react';
import styles from './AccountIdenticon.module.css';
import Image from 'next/image';

const RESOLUTION = 7;
const SIZE = 448;

// Base32 alphabet map
const base32Alphabet: Record<string, number> = {};
'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  .split('')
  .forEach((c, i) => (base32Alphabet[c] = i));

function decodeBase32(input: string): number[] {
  const buf: number[] = [];
  let shift = 8;
  let carry = 0;

  input
    .toUpperCase()
    .split('')
    .forEach((char) => {
      const symbol = base32Alphabet[char] & 0xff;
      shift -= 5;
      if (shift > 0) {
        carry |= symbol << shift;
      } else if (shift < 0) {
        buf.push(carry | (symbol >> -shift));
        shift += 8;
        carry = (symbol << shift) & 0xff;
      } else {
        buf.push(carry | symbol);
        shift = 8;
        carry = 0;
      }
    });

  if (shift !== 8 && carry !== 0) {
    buf.push(carry);
    shift = 8;
    carry = 0;
  }

  return buf;
}

/**
 * Draw Stellar address identicon and return as SVG string
 * @param address - StrKey-encoded account address
 * @param size - Identicon painting area size, in pixels (default 448)
 */
export function drawIdenticon(address: string, size: number = SIZE): string {
  // take 16 meaningful bytes from the raw pub key
  const decoded = decodeBase32(address).slice(2, 16);
  const width = RESOLUTION;
  const height = RESOLUTION;
  const columns = Math.ceil(width / 2);
  const cellSize = size / width;
  const addressBytes = decoded.slice(1);
  const hue = ((360 * decoded[0]) / 256) | 0;
  const fillStyle = `hsl(${hue},58%,52%)`;
  const dots: string[] = [];
  const rsize = ` width="${cellSize}" height="${cellSize}"`;

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < columns; column++) {
      const position = column + row * columns;
      const bitSet =
        (addressBytes[(position / 8) | 0] & (1 << (7 - (position % 8)))) !== 0;
      if (bitSet) {
        dots.push(
          `<rect x="${cellSize * column}" y="${cellSize * row}"${rsize}/>`,
        );
        dots.push(
          `<rect x="${cellSize * (width - column - 1)}" y="${
            cellSize * row
          }"${rsize}/>`,
        );
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" fill="${fillStyle}">${dots.join(
    '',
  )}</svg>`;
}

export type AccountIdenticonProps = {
  address: string;
  /** rendered CSS size in px (does not change internal grid resolution) */
  size?: number;
  className?: string;
};

/**
 * Next.js-friendly identicon component
 */
const AccountIdenticon = React.memo(function AccountIdenticon({
  address,
  size,
  className,
}: AccountIdenticonProps) {
  // Generate SVG data URL
  const svg = drawIdenticon(address, SIZE);
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  const style: React.CSSProperties | undefined = size
    ? { width: size, height: size }
    : undefined;

  return (
    <Image
      className={`${styles.identicon} ${className ?? ''}`}
      src={src}
      alt="Account identicon"
      width={SIZE}
      height={SIZE}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );
});

export default AccountIdenticon;
