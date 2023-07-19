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
  suspense: true,
  staleTime: 300000
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

export const getCurrentDate = (): string => {
  const date = new Date();
  return date.toISOString().slice(0,10);
}

export const getFutureDate = (months: number): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + months, 1); // Set day to 1 for first day of the month
  return date.toISOString().slice(0,10);
}

export const getLastDayOfMonth = (dateString: string): Date => {
  const [month, year] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month, 0, 4)); // GMT+4 timezone offset
  return date;
}
