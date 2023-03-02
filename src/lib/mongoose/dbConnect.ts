import mongoose from 'mongoose';

const connection: any = {}
const MONGODB_URI = process.env.MONGODB_URI || "";

export default async function dbConnect () {

    if (connection.isConnected) {
        console.log('DB is already connected');
        return;
    }
      const db = await mongoose.connect(MONGODB_URI);
      console.log('MongoDB Database Connected Successfully');
      connection.isConnected = db.connections[0].readyState;
  };