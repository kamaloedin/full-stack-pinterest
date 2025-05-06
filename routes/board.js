import express from 'express';
import { test } from '../backend/controllers/user';

const router = express.Router();

router.get('/user', test);
