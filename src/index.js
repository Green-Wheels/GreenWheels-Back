 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDb } from './service/db.service.js';
import authRouter from './routes/auth.route.js';
import vehicleRouter from './routes/vehicle.route.js';
 import reservationsRouter from './routes/reservations.route.js';
 import bookingRouter from './routes/booking.route.js';
import { startBackgroundTasks } from './backgroundtasks/ backgroundTasks.js';
import { seedRoles } from './model/role.model.js';
import * as MailService from './service/mail.service.js';
import vehicleCountsRouter from './routes/vehicleCounts.route.js';

/* import { newReservation } from './controller/reservationsController.js';
 *//* import { addVehicles } from './controllers/vehicleController';
 */


//-------------------------------------------------------------------------------------
dotenv.config();

// Initialisiere den Mail Client
MailService.initSgMail();

// Initialisiere express
const app = express();

const corsWhitelist = process.env.CORS_WHITELIST.split(",");

// fügen Sie die URL Ihrer gehosteten Frontend-App zur Liste der erlaubten Origin hinzu
corsWhitelist.push('https://g5-greenwheels.onrender.com');


// Middleware fuer CROSS-ORIGIN-REQUEST
const corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));


// --------------------- ROUTES -------------------------
app.use('/auth', authRouter);
app.use('/vehicles', vehicleRouter);
app.use('/reservations', reservationsRouter);
app.use('/booking', bookingRouter);
app.use('/api/vehicleCounts', vehicleCountsRouter);


await connectToDb(seedRoles);
// Start background tasks
startBackgroundTasks();
// ----------------------------------------------------------

app.listen(process.env.API_PORT, () => {
    console.log('Server is listening on https://g5-greenwheels-backend-2ilc.onrender.com');
});