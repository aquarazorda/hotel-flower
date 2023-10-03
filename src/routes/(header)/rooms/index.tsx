import Rooms from '~/client/components/Rooms';
import { getRooms } from '~/server/db/rooms';

export const routeData = () => getRooms({
  type: 'room'
});

export default Rooms;
