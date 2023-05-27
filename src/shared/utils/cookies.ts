import { isServer } from 'solid-js/web';
import { useServerContext } from 'solid-start';

export const useCookies = () => {
  const setCookie = (name: string, value: any, path?: string, days?: number) => {
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${JSON.stringify(value)};${expires};path=${path || '/'}`;
      return;
    }
    
    document.cookie = `${name}=${JSON.stringify(value)};path=${path || '/'}`;
  };

  const getCookie = (name: string) => {
    const server = useServerContext();
    const cookieName = `${name}=`;
    const c = isServer ? server.request.headers.get('cookie') : document.cookie;
    const cookies = c?.split(';') || [];

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
      if (cookie.indexOf(cookieName) === 0) return JSON.parse(cookie.substring(cookieName.length, cookie.length));
    }

    return '';
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return { setCookie, getCookie, deleteCookie };
}