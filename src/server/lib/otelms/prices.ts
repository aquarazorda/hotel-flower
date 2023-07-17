import { Cheerio, CheerioAPI, Element, load } from "cheerio";
import { getLoginCookies } from ".";
import { addTwoMonths } from "~/shared/utils";
import { RoomWithFullData } from '~/server/db/zod';

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
  let data: { [key: number]: Record<string, number> } = {};

  d.forEach(({ $, rows, month, year }) => {
    rows.each((i, element) => {
      const rowData = $(element).find("td");

      const currMonthEl = rowData[1];
      const msId = Number($(currMonthEl).attr("category_id"));

      const prices = {
        currMonth: Number($(currMonthEl).text().trim()),
        nextMonth: Number($(rowData[6]).text().trim()),
      };

      if (prices.currMonth !== 0 && prices.nextMonth !== 0) {
        if (!data[msId]) {
          data[msId] = {};
        }
        data[msId][`${month}-${year}`] = prices.currMonth;
        data[msId][`${month + 1}-${year}`] = prices.nextMonth;
      }
    });
  });

  return Object.keys(data).map((key) => ({
    msId: Number(key),
    list: data[Number(key)],
  }));
};

export const getPrices = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Cookie", await getLoginCookies());

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const data = await Promise.all(
    [-2, 0, 2, 4, 6].flatMap(async (i) => {
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


export const calculatePrices = ([startDate, end]: string[], room: RoomWithFullData) => {
  const dates_ = [];
  let currentDate = new Date(startDate);
  let endDate = new Date(end);

  while (currentDate <= endDate) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    dates_.push({ month, year });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const price = dates_.reduce((acc, { month, year }) => {
    const price = room?.prices?.list[`${month}-${year}`];
    return price ? acc + price : 0;
  }, 0);

  return price;
}