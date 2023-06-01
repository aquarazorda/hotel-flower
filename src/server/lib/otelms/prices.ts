import { Cheerio, CheerioAPI, Element, load } from "cheerio";
import { getLoginCookies } from ".";
import { addTwoMonths } from "~/shared/utils";
import { Room } from '@prisma/client';

const fetchPrices = (headers: Headers, month: number, year: number) => {
  const { MS_CALENDAR_URL } = process.env;

  if (!MS_CALENDAR_URL) {
    throw new Error("Missing env variables");
  }

  const body = new URLSearchParams();
  body.append("date", year + "-" + month + "-28");

  return fetch(MS_CALENDAR_URL, {
    headers,
    body,
    method: "POST",
  }).then((res) => res.text());
};

type Input = {
  $: CheerioAPI;
  rows: Cheerio<Element>;
  month: number;
  year: number;
};

const generatePrices = (d: Input[]) => {
  let data: { [key: number]: Record<string, string> } = {};

  d.forEach(({ $, rows, month, year }) => {
    rows.each((i, element) => {
      const rowData = $(element)
        .find("td")
        .map((i, el) => $(el).text().trim());
      const price = rowData[1];

      if (price !== "0") {
        if (!data[i]) {
          data[i] = {};
        }
        data[i][`${month}-${year}`] = rowData[1];
        data[i][`${month + 1}-${year}`] = rowData[6];
      }
    });
  });

  return data;
};

export const getPrices = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Cookie", await getLoginCookies());

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const data = await Promise.all(
    [0, 2, 4, 6].flatMap(async (i) => {
      const { nextMonth, nextYear } = addTwoMonths(
        currentMonth + i,
        currentYear
      );

      const html = await fetchPrices(headers, nextMonth, nextYear);
      const $ = load(html);
      return {
        month: nextMonth,
        year: nextYear,
        rows: $(".rooms.ui-selectable"),
        $,
      };
    })
  );

  return generatePrices(data);
};


const calculatePrices = ([startDate, endDate]: [Date, Date], room: Room) => {
  const dates_ = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    dates_.push({ month, year });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const dates = dates_.reduce((acc, { month, year }) => {
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(month);
    return acc;
  }, 0);
}