import { createEffect } from "solid-js";
import { createServerAction$ } from "solid-start/server";
import { P, isMatching } from "ts-pattern";
import { authenticate } from "~/server/db/prisma";
import { setCmsLoggedIn } from './(nav)';
import { useNavigate } from 'solid-start';

const userSchema = {
  username: P.string.minLength(5),
  password: P.string.minLength(10),
};

export default function Login() {
  const navigate = useNavigate();
  const [authenticating, { Form }] = createServerAction$(
    async (form: FormData) => {
      const data = Object.fromEntries(form.entries()) as P.infer<
        typeof userSchema
      >;
      if (isMatching(userSchema, data)) {
        const status = await authenticate(data);
        return { success: status };
      }

      return { success: false };
    }
  );

  createEffect(() => {
    if (authenticating.result?.success) {
      setCmsLoggedIn(true);
      navigate('/cms');
    }
  });

  return (
    <div class="h-screen bg-gray-800">
      <div class="flex h-1/4 flex-col items-center justify-center gap-4 bg-gray-700">
        <h1 class="text-2xl font-semibold uppercase text-white">
          Hotel Flower
        </h1>
        <p class="text-base text-stone-400">
          Dear user, log in to access the admin area!
        </p>
      </div>
      <Form class="mt-14 flex flex-col items-center justify-center gap-4">
        <input name="username" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
