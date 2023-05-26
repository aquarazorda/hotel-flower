import { Show, lazy } from 'solid-js';
import { useDevice } from '~/server/lib/device';

const Mobile = lazy(() => import('./mobile'));
const Desktop = lazy(() => import('./desktop'));

export default function Header() {
  const { isDesktop } = useDevice();
  
  return <Show when={isDesktop()} fallback={<Mobile />}>
    <Desktop />
  </Show>;
}