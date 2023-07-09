import { JSX } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface CustomEvents {
      "changeDate": DateChangeEvent
    }
    interface Directives {
      clickOutside?: () => void;
    }
  }
}

type DateChangeEvent = CustomEvent<{ date: Date }>;
// class DateChangeEvent extends CustomEvent {
//   type: "changeDate";
//   detail: { date: Date };

//   constructor(date: Date) {
//     super("changeDate", { detail: { date } });
//   }
// }