import server$ from 'solid-start/server';
import { Room } from '~/shared/data/rooms';
import { getImageUrl } from './cloudinary';
import { User } from './user';

type Props = {
  user: User,
  amount: number,
  lang: string,
  room: Room,
  from: string,
  to: string
}

const getOptions = (props: Props) => ({
  method: 'POST',
  headers: {accept: 'application/json', 'content-type': 'application/json'},
  body: JSON.stringify({
    method: 'justPay',
    apiKey: process.env.PAYZE_KEY,
    apiSecret: process.env.PAYZE_SECRET,
    data: {
      amount: props.amount,
      currency: 'GEL',
      callback: 'https://corp.com/success_callback',
      callbackError: 'https://corp.com/fail_url',
      preauthorize: false,
      lang: 'EN',
      info: {
        // description: props.room.,
        image: getImageUrl('/' + props.room.id + '/1', 300),
        name: props.room.name,
      },
      hookRefund: false
    }
  })
})

export const payWithPayze = server$((props: Props) => {
  const options = getOptions(props);

  return fetch('https://payze.io/api/v1', options)
    .then(response => response.json())
})