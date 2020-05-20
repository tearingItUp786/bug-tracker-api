import { resolve } from 'path';
import { config } from 'dotenv';

// set up process to have env variables for dotnev.
const path = resolve(__dirname, '../../.env');
config({ path });

console.log(__dirname, path, process.env.PGDATABASE);
