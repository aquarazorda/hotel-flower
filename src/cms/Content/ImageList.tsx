import { query$ } from "@prpc/solid";
import { readdirSync } from "fs";
import { useParams } from "solid-start";
import { z } from "zod";
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  createDroppable,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { batch, createEffect, createSignal, For, on } from "solid-js";
import { createStore } from "solid-js/store";
import { Button } from "@kobalte/core";
import { saveRoomInfo } from '~/server/client/room';

const getImageCount = query$({
  key: "imageList",
  queryFn: ({ payload }) => {
    let files;

    try {
      files = readdirSync(`./public/img/${payload}`).sort((a, b) => {
        return Number(a.split("-")[0]) - Number(b.split("-")[0]);
      });
    } catch (e) {
      files = readdirSync(`./img/${payload}`).sort((a, b) => {
        return Number(a.split("-")[0]) - Number(b.split("-")[0]);
      });
    }

    return Number(files[files.length - 1].split("-")[0]);
  },
  schema: z.string(),
});

const Sortable = (props) => {
  const { id } = useParams();
  const sortable = createSortable(props.item);
  return (
    <div
      use:sortable
      class="w-80"
      classList={{ "opacity-25": sortable.isActiveDraggable }}
    >
      <img src={`/img/${id}/${props.item}-mobile.webp`} />
    </div>
  );
};

const Column = (props) => {
  const droppable = createDroppable(props.id);
  return (
    <div use:droppable class="flex w-96 flex-col items-center gap-3 bg-[#303641] p-3">
      <SortableProvider ids={props.items}>
        <For each={props.items}>{(item) => <Sortable item={item} />}</For>
      </SortableProvider>
    </div>
  );
};

type ImageListProps = {
  pictures: number[] | undefined;
};

export default function ImageListCms(props: ImageListProps) {
  const params = useParams();
  const imageCount = getImageCount(params.id);
  const [containers, setContainers] = createStore<Record<string, number[]>>({});
  const save = saveRoomInfo();

  createEffect(on(() => imageCount.data, (images = 0) => {
    const pictures = props.pictures || [];
    const newContainers: Record<string, number[]> = {
      A: [],
      B: pictures
    };
    
    for (let i = 1; i <= images; i++) {
      !pictures.includes(i) && newContainers.A.push(i);
    }

    setContainers(newContainers);
  }))

  const containerIds = () => Object.keys(containers);

  const isContainer = (id: string) => containerIds().includes(id);

  const getContainer = (id: number) => {
    for (const [key, items] of Object.entries(containers)) {
      if (items.includes(id)) {
        return key;
      }
    }
  };

  const closestContainerOrItem = (draggable, droppables, context) => {
    const closestContainer = closestCenter(
      draggable,
      droppables.filter((droppable) => isContainer(droppable.id)),
      context
    );
    if (closestContainer) {
      const containerItemIds = containers[closestContainer.id];
      const closestItem = closestCenter(
        draggable,
        droppables.filter((droppable) =>
          containerItemIds.includes(droppable.id)
        ),
        context
      );
      if (!closestItem) {
        return closestContainer;
      }

      if (getContainer(draggable.id) !== closestContainer.id) {
        const isLastItem =
          containerItemIds.indexOf(closestItem.id as number) ===
          containerItemIds.length - 1;

        if (isLastItem) {
          const belowLastItem =
            draggable.transformed.center.y > closestItem.transformed.center.y;

          if (belowLastItem) {
            return closestContainer;
          }
        }
      }
      return closestItem;
    }
  };

  const move = (draggable, droppable, onlyWhenChangingContainer = true) => {
    const draggableContainer = getContainer(draggable.id);
    const droppableContainer = isContainer(droppable.id)
      ? droppable.id
      : getContainer(droppable.id);

    if (
      draggableContainer != droppableContainer ||
      !onlyWhenChangingContainer
    ) {
      const containerItemIds = containers[droppableContainer];
      let index = containerItemIds.indexOf(droppable.id);
      if (index === -1) index = containerItemIds.length;

      batch(() => {
        setContainers(draggableContainer, (items) =>
          items.filter((item) => item !== draggable.id)
        );
        setContainers(droppableContainer, (items) => [
          ...items.slice(0, index),
          draggable.id,
          ...items.slice(index),
        ]);
      });
    }
  };

  const onDragOver = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable);
    }
  };

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable, false);
    }
  };

  const onSave = () => {
    save.mutateAsync({
      roomId: Number(params.id),
      pictures: containers.B
    });
  }

  return (
    <div class="mt-5 flex flex-1 flex-col self-stretch">
      <Button.Root
        type="button"
        onClick={onSave}
        class="group relative mb-8 ml-auto mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-800 group-hover:from-cyan-500 group-hover:to-blue-500"
      >
        <span class="relative rounded-md bg-gray-900 px-5 py-2.5 uppercase transition-all duration-75 ease-in hover:bg-transparent">
          Save pictures
        </span>
      </Button.Root>
      <DragDropProvider
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        collisionDetector={closestContainerOrItem}
      >
        <DragDropSensors />
        <div class="flex justify-between p-7">
          <For each={containerIds()}>
            {(key) => <Column id={key} items={containers[key]} />}
          </For>
        </div>
        <DragOverlay>
          {(draggable) => (
            <img
              src={`/img/${params.id}/${draggable.id}-mobile.webp`}
              class="w-96"
            />
          )}
        </DragOverlay>
      </DragDropProvider>
    </div>
  );
}
