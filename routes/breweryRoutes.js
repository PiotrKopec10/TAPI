import express from 'express';
import {
    getAllBreweries,
    getBreweryById,
    addBrewery,
    updateBrewery,
    deleteBreweryById,
    partialUpdateBrewery 
} from '../controllers/breweryController.js';

const router = express.Router();

router.get('/breweries', getAllBreweries);
router.get('/breweries/:id', getBreweryById);
router.post('/breweries', addBrewery);
router.put('/breweries/:id', updateBrewery);
router.patch('/breweries/:id', partialUpdateBrewery); 
router.delete('/breweries/:id', deleteBreweryById);

export default router;
