import express from 'express';
import { getAllBeers, getBeerById, addBeer, updateBeer, partialUpdateBeer, deleteBeerById, searchBeersByTypeAndFlavor  } from '../controllers/beerController.js';

const router = express.Router();


router.get('/beers', getAllBeers);
router.get('/beers/:id', getBeerById);
router.post('/beers', addBeer);
router.put('/beers/:id', updateBeer);
router.patch('/beers/:id', partialUpdateBeer);
router.delete('/beers/:id', deleteBeerById);


router.get('/beers/:type/flavors/:flavor', searchBeersByTypeAndFlavor);

export default router;
