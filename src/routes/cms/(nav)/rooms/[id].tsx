import { Button, TextField } from "@kobalte/core";
import {
  createForm,
  zodForm,
} from "@modular-forms/solid";
import {
  Suspense,
  createComponent,
} from "solid-js";
import { useRouteData } from "solid-start";
import BookingInput from "~/client/components/Booking/input";
import { getRoomRouteData } from "~/client/query/getRoomRouteData";
import ImageListCms from '~/cms/Content/ImageList';
import PricesSection from '~/cms/Content/PricesSection';
import CmsPage from "~/cms/Page";
import {
  RoomInfoForm,
  roomInfoSchema,
  saveRoomInfo,
} from "~/server/client/room";

export const routeData = getRoomRouteData;

export default function RoomEdit() {
  const { room } = useRouteData<typeof routeData>();
  const save = saveRoomInfo();

  const onSubmit = (values: RoomInfoForm) => {
    save.mutateAsync({
      roomId: room.data!.roomId,
      ...values,
    });
  };

  return (
    <CmsPage title="Edit Room">
      <Suspense>
        <h2 class="w-full text-center font-medium">
          {room.data?.roomId} - {room.data?.name}
        </h2>
        {createComponent((initialValues) => {
          const [roomInfo, { Form, Field }] = createForm<RoomInfoForm>({
            validate: zodForm(roomInfoSchema),
            initialValues: initialValues || {},
          });

          return (
            <Form
              onSubmit={(values) => onSubmit(values)}
              class="flex flex-col gap-3"
            >
              <div class="flex gap-2">
                <Field type="number" name="persons">
                  {BookingInput({
                    type: "number",
                    name: "persons",
                    placeholder: "Persons",
                    errors: () => undefined,
                    showTitle: true,
                  })}
                </Field>
                <Field type="boolean" name="extraPerson">
                  {(field, props) => (
                    <TextField.Root>
                      <TextField.Label class="text-sm text-neutral-500">
                        Extra person
                      </TextField.Label>
                      <TextField.Description>
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={field.value}
                          // class="w-full overflow-visible rounded-md border-[0.5px] border-neutral-300 px-4 py-3 focus-visible:border-zinc-500 focus-visible:outline-none"
                          class="h-6 w-6 rounded border-gray-600 bg-gray-700 ring-offset-gray-800"
                          {...props}
                        />
                      </TextField.Description>
                    </TextField.Root>
                  )}
                </Field>
              </div>
              <Field name="description">
                {BookingInput({
                  name: "description",
                  placeholder: "Description",
                  errors: () => undefined,
                  showTitle: true,
                  textArea: true,
                })}
              </Field>
              <Button.Root
                type="submit"
                class="group relative mb-2 ml-auto mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-800 group-hover:from-cyan-500 group-hover:to-blue-500"
              >
                <span class="relative rounded-md bg-gray-900 px-5 py-2.5 uppercase transition-all duration-75 ease-in hover:bg-transparent">
                  Save info
                </span>
              </Button.Root>
            </Form>
          );
        }, room.data?.info)}
        <hr />
        <PricesSection />
        <hr />
        <Suspense>
          <ImageListCms pictures={room?.data?.info?.pictures} />
        </Suspense>
      </Suspense>
    </CmsPage>
  );
}
