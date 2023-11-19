import { auth } from "~/server/auth";
if (process.env.CMS_ADMIN_PASS === undefined) {
  throw new Error("CMS_ADMIN_PASSWORD is not defined");
}

const res = await auth.createUser({
  key: {
    providerId: "username",
    providerUserId: "flower-admin",
    password: process.env.CMS_ADMIN_PASS,
  },
  attributes: {
    username: "flower-admin",
  },
});

if (res.userId) {
  console.log("ok", res.userId);
}
