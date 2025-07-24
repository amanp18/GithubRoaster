import express from 'express'
import { roastcontroller } from '../controllers/roastController.js';

export const roastRoutes = express.Router();

roastRoutes.get("/roast",roastcontroller)