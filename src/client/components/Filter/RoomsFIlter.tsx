import FilterButton from './Button';

const RoomsFilter = () => {
  return <div class="my-auto mt-2 flex w-full justify-center gap-2 xl:justify-normal">
    <FilterButton icon="calendar" onClick={console.log}>
      Check In
    </FilterButton>
    <FilterButton icon="calendar" onClick={console.log}>
      Check Out
    </FilterButton>
    <FilterButton icon="profile" onClick={console.log} rounded />
    <FilterButton icon="settings" onClick={console.log} class="xl:ml-auto">
      Sort By
    </FilterButton>
  </div>
}

export default RoomsFilter;