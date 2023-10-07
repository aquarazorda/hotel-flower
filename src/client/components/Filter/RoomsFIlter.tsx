import { CalendarIcon } from '~/client/assets/icons/Calendar';
import FilterButton from './Button';
import { ProfileIcon } from '~/client/assets/icons/Profile';
import { SettingsIcon } from '~/client/assets/icons/Settings';

const RoomsFilter = () => {
  return <div class="my-auto mt-2 flex w-full justify-center gap-1 lg:mt-6 lg:justify-normal lg:gap-2 lg:px-7">
    <FilterButton Icon={CalendarIcon} onClick={console.log}>
      Check In
    </FilterButton>
    <FilterButton Icon={CalendarIcon} onClick={console.log}>
      Check Out
    </FilterButton>
    <FilterButton Icon={ProfileIcon} onClick={console.log} rounded />
    <FilterButton Icon={SettingsIcon} onClick={console.log} class="lg:ml-auto">
      Sort By
    </FilterButton>
  </div>
}

export default RoomsFilter;