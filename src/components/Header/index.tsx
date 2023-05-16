import { Show, lazy } from 'solid-js';
import { useDevice } from '~/lib/device';

const Mobile = lazy(() => import('./mobile'));
const Desktop = lazy(() => import('./desktop'));

export default function Header() {
  const { isDesktop } = useDevice();
  
  return <Show when={isDesktop()} fallback={<Mobile />}>
    <Desktop />
  </Show>;
}