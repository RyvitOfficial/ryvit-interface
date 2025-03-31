import { Pages } from '@/constants/Pages';
import { redirect } from 'next/navigation';

export default function page() {
  redirect(Pages.SIGNIN);
}
