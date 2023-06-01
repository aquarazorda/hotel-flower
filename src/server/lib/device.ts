import { isServer } from 'solid-js/web';
import { useServerContext } from "solid-start";

export const useDevice = () => {
  const SC = useServerContext();
  const UA = isServer ? SC.request.headers.get("user-agent") : window.navigator.userAgent;
  
  const isDesktop = UA
  ? !UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  : true

  return { isDesktop };
};
