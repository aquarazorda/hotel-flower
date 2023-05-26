import { Sidebar } from '~/cms/Sidebar';

export default function CmsMain() {

  return <div class="flex">
    <Sidebar />
    <div class="flex w-full justify-center">
      <h1 class="mt-16">Welcome to dashboard!</h1>
    </div>
  </div>
}