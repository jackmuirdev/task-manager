import dotenv from 'dotenv';
import colors from 'colors';
import { connectDB } from './database/db.js';
import User from './models/db/userModels.js';
import { users } from './data/users.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    console.log('Data Imported'.green.inverse)
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const command = process.argv[2];

if (command === 'destroy') {
  destroyData();
} else if (command === 'import') {
  importData();
} else {
  console.log('Invalid command. Use "import" to import data or "destroy" to destroy data.');
  process.exit(1);
}