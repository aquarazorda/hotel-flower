export const capitalizeFirstLetter = (str: string) => {
  if (!str) {
    return str;
  }

  const firstLetter = str[0].toUpperCase();
  const restOfString = str.slice(1);

  return firstLetter + restOfString;
}

export const defaultQueryOptions = {
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
};