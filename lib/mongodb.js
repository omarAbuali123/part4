// import { MongoClient } from 'mongodb';

// let client;
// let clientPromise;

// if (!global._mongoClientPromise) {
//   const uri = process.env.MONGODB_URI; 
//   client = new MongoClient(uri);
//   global._mongoClientPromise = client.connect(); 
// }

// clientPromise = global._mongoClientPromise;

// export default clientPromise;








import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
