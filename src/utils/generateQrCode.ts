import { toDataURL } from 'qrcode';

const generateQrCode = async (address: string, memo: string) => {
  const qr = await toDataURL(
    `stellar:${address}?memo=${memo}&memo_type=MEMO_TEXT`,
    { type: 'image/webp' },
  );

  return qr;
};

export default generateQrCode;
