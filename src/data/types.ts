import { ObjectId } from 'mongodb'

export type Booking = {
  "_id": ObjectId,
  name: string
  dates: {
    from: string,
    to: string
  }[]
}