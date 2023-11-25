import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`).then(() => {
      console.log('Database connected');
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
