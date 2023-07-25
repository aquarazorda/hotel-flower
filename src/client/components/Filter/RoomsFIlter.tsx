import FilterButton from './Button';

const RoomsFilter = () => {
  return <div class="mt-2 flex gap-1 px-3">
    <FilterButton icon="calendar" onClick={console.log}>
      Check In
    </FilterButton>
    <FilterButton icon="calendar" onClick={console.log}>
      Check Out
    </FilterButton>
    <FilterButton icon="profile" onClick={console.log} rounded />
    <FilterButton icon="settings" onClick={console.log}>
      Sort By
    </FilterButton>
  </div>
}

export default RoomsFilter;