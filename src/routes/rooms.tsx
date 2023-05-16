import { Outlet } from 'solid-start'
import Header from '~/components/Header';
import { useDevice } from '~/lib/device';

export default function Rooms() {
  return <>
    <Header />
    <Outlet />
  </>
}