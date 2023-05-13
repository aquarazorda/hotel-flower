import { onCleanup, onMount } from 'solid-js';
import { isServer } from 'solid-js/web';
import 'vanillajs-datepicker/css/datepicker.css';

export const DateRangePicker = () => {
  let ref: HTMLDivElement | undefined;
  let datePicker: any;
  
  onMount(async () => {
    if (!isServer && ref) {
      const { DateRangePicker } = await import('vanillajs-datepicker');
      datePicker = new DateRangePicker(ref, {
        format: 'dd-mm-yyyy',
        minDate: new Date(),
      } as any);
    }
  });

  onCleanup(() => {
    datePicker.destroy();
  });

  return <div ref={ref}>
    <input type="text" name="start" on:changeDate={({ detail }) => console.log(detail.date)} />
    <span>to</span>
    <input type="text" name="end" onInput={console.log} />  
  </div>
}