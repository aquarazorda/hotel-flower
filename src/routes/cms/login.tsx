import { ServerError, createServerAction$, redirect } from "solid-start/server";
import { P, isMatching } from "ts-pattern";
import { auth } from "~/server/auth";
import { LuciaError } from "lucia";

const userSchema = {
  username: P.string.minLength(5),
  password: P.string.minLength(10),
};

export default function Login() {
  const [authenticating, { Form }] = createServerAction$(
    async (form: FormData) => {
      const data = Object.fromEntries(form.entries()) as P.infer<
        typeof userSchema
      >;
      if (isMatching(userSchema, data)) {
        try {
          const key = await auth.useKey(
            "username",
            data.username.toLowerCase(),
            data.password,
          );

          const session = await auth.createSession({
            userId: key.userId,
            attributes: {},
          });

          const sessionCookie = auth.createSessionCookie(session);

          return redirect("/cms", {
            headers: {
              "Set-Cookie": sessionCookie.serialize(),
            },
          });
        } catch (e) {
          if (
            e instanceof LuciaError &&
            (e.message === "AUTH_INVALID_KEY_ID" ||
              e.message === "AUTH_INVALID_PASSWORD")
          ) {
            throw new ServerError("Incorrect username or password");
          }
          throw new ServerError("An unknown error occurred");
        }
      }

      throw new ServerError("Incorrect username or password");
    },
  );

  return (
    <div class="h-screen bg-gray-800">
      <div class="flex h-1/4 flex-col items-center justify-center gap-4 bg-gray-700">
        <h1 class="text-xl font-semibold uppercase text-white">Hotel Flower</h1>
        <p class="text-base text-stone-400">
          Dear user, log in to access the admin area!
        </p>
      </div>
      <Form class="mt-14 flex flex-col items-center justify-center gap-4">
        <input name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit" class="rounded bg-gray-400 p-2">
          Submit
        </button>
      </Form>
    </div>
  );
}
