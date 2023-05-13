import { MongoClient } from "mongodb";
import server$ from 'solid-start/server';

export const saveBookings = server$(async (bookingsData: any) => {
  const { DATABASE_URI } = process.env;

  if (!DATABASE_URI) {
    return new Response(JSON.stringify({ success: false }));
  }

  const client = new MongoClient(DATABASE_URI);

  try {
    await client.connect();
    
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
})