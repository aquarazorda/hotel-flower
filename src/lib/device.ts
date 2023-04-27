import { createMediaQuery } from '@solid-primitives/media';

export const useDevice = () => ({
  isDesktop: createMediaQuery('(min-width: 1280px)')
});