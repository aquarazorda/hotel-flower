import flatpickr from "flatpickr";
import { createEffect, on, onCleanup, onMount } from "solid-js";

import "flatpickr/dist/flatpickr.min.css";
import "./calendar.css";

type Props = {
  isLoading: boolean;
  onChange?: (selectedDates: Date[]) => void; // eslint-disable-line
} & Omit<flatpickr.Options.Options, "onChange">;

export const DateRangePicker = (props: Props) => {
  let ref: HTMLDivElement | undefined;
  let datePicker: any;

  const onChange = (
    selectedDates: Date[],
    dateStr: string,
    instance: flatpickr.Instance
  ) => {
    if (selectedDates.length === 2) {
      // a range was selected
      var disabledRanges = instance.config
        .disable as flatpickr.Options.DateRangeLimit[];

      for (var i = 0; i < disabledRanges.length; i++) {
        var disabledFrom = instance.parseDate(disabledRanges[i].from);
        var disabledTo = instance.parseDate(disabledRanges[i].to);

        if (
          (disabledFrom &&
            disabledFrom > selectedDates[0] &&
            disabledFrom < selectedDates[1]) ||
          (disabledTo &&
            disabledTo > selectedDates[0] &&
            disabledTo < selectedDates[1])
        ) {
          instance.clear();
          props.onChange?.([]);
          break;
        }
      }

      props.onChange?.(selectedDates);
      return;
    }
    props.onChange?.([]);
  };

  onMount(async () => {
    if (ref) {
      datePicker = flatpickr(ref, props);
    }
  });

  onCleanup(() => {
    datePicker.destroy();
  });

  createEffect(on(() => props.isLoading ,() => {
    if (!props.isLoading && ref) {
      datePicker = flatpickr(ref, { ...props, onChange });
    }
  }));

  return <div ref={ref} />;
};

export default DateRangePicker;
