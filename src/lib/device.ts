import { createMediaQuery } from '@solid-primitives/media';
import { isServer } from 'solid-js/web';
import { useServerContext } from 'solid-start';

export const useDevice = () => {
  if (!isServer) {
    return {
      isDesktop: createMediaQuery('(min-width: 1280px)')
    }
  }

  const SC = useServerContext();
  const UA = SC.request.headers.get('user-agent');
  const isDesktop = UA ? !UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  ) : true;
  
  return { isDesktop: () => isDesktop }
};