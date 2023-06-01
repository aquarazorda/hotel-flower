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

export const addTwoMonths = (month: number, year: number) => {
  const nextMonth = month + 2;
  const nextYear = year;

  if (nextMonth > 12) {
    return {
      nextMonth: nextMonth - 12,
      nextYear: nextYear + 1,
    };
  }

  return {
    nextMonth,
    nextYear,
  };
}

export const toGmt4 = (date: Date) => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000);
}