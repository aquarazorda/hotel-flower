import { MongoClient } from "mongodb";
import server$ from 'solid-start/server';
import { Booking } from '~/data/types';

const getClient = server$(async () => {
  const { DATABASE_URI } = process.env;

  if (!DATABASE_URI) {
    return false;
  }

  const client = new MongoClient(DATABASE_URI);

  try {
    await client.connect();
    return client;
  } catch (error) {
    return false;
  }
})

export const saveBookings = server$(async (bookingsData: Booking[]) => {
  const client = await getClient();

  if (!client) {
    return new Response(JSON.stringify({ success: false, message: "Can't get client" }));
  }

  try {
    const database = client.db("hotel");
    const bookings = database.collection("bookings");
    await bookings.deleteMany({});
    await bookings.insertMany(bookingsData);

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false }));
  } finally {
    await client.close();
  }
});

export const getBookings = server$(async () => {
  const client = await getClient();

  if (!client) {
    return false;
  }

  try {
    const database = client.db("hotel");
    const bookings = database.collection("bookings");
    const bookingsData = await bookings.find({}).toArray();
    
    return bookingsData as Booking[];
  } catch (error) {
    return false;
  }
});