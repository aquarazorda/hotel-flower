import { Outlet } from 'solid-start'
import Header from '~/client/components/Header';

export default function Suites() {
  return <>
    <Header />
    <Outlet />
  </>
}