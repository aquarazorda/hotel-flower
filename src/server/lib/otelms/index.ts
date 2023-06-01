import server$ from "solid-start/server";
import { load } from "cheerio";

export const getLoginCookies = server$(async () => {
  const { MS_LOGIN_URL, MS_LOGIN_EMAIL, MS_LOGIN_PASSWORD } = process.env;

  if (!MS_LOGIN_URL || !MS_LOGIN_EMAIL || !MS_LOGIN_PASSWORD) {
    throw new Error("Missing env variables");
  }

  let headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("action", "login");
  urlencoded.append("login", MS_LOGIN_EMAIL);
  urlencoded.append("password", MS_LOGIN_PASSWORD);

  const response = await fetch(MS_LOGIN_URL, {
    headers,
    body: urlencoded,
    method: "POST",
  });

  const cookies = response.headers.get("set-cookie")?.split(";");
  const pid = cookies?.[0];
  const cid = cookies?.[1].split(", ")[1];

  return pid + "; " + cid;
});

export const getBookedDates = server$(async () => {
  const { MS_BOOKINGS_URL } = process.env;

  if (!MS_BOOKINGS_URL) {
    throw new Error("Missing env variables");
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Cookie", await getLoginCookies());

  const body = new URLSearchParams();
  body.append("pages", "1");
  body.append("lines", "500");

  const res = await fetch(MS_BOOKINGS_URL, {
    headers,
    body,
    method: "POST",
  });

  return generateBookingDates(await res.text());
});

const generateBookingDates = (html: string) => {
  const $ = load(html);
  const rows = $(".content .redline");

  const tableData: { name: string; from: string; to: string }[] = [];

  rows.each((index, element) => {
    const tableRowData: string[] = [];

    $(element)
      .find("td")
      .each((index, element) => {
        tableRowData.push($(element).text().trim());
      });

    if (tableRowData.length === 12) {
      tableData.push({
        name: tableRowData[4],
        from: tableRowData[9],
        to: tableRowData[11],
      });
    }
  });

  const unique = tableData.reduce((acc, curr) => {
    const name = curr.name.split(" ")[0];

    return acc.set(name, [
      ...(acc.get(name) ?? []),
      { from: curr.from, to: curr.to },
    ]);
  }, new Map<string, { from: string; to: string }[]>());

  const res = [];
  for (const [key, value] of unique.entries()) {
    res.push({ roomId: Number(key), dates: value });
  }

  return res;
};
