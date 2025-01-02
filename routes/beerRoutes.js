import express from 'express';
import { 
    getBeerById, 
    addBeer, 
    updateBeer, 
    partialUpdateBeer, 
    deleteBeerById, 
    searchBeers 
} from '../controllers/beerController.js';





// tylko 2 resource
//brakuje headers



const router = express.Router();

router.get('/beers', searchBeers); 
router.get('/beers/:id', getBeerById);
router.post('/beers', addBeer);
router.put('/beers/:id', updateBeer);
router.patch('/beers/:id', partialUpdateBeer);
router.delete('/beers/:id', deleteBeerById);

export default router;
