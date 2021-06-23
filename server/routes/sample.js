import express from 'express';
const route = express.Router();
import {getSample} from '../controllers/sample.js'
route.get('/', getSample);

export default route;