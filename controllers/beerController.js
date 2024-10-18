import beers from '../data/beers.json' assert {type: 'json'};

// GET wszystkie piwka
export const getAllBeers = (req, res) => {
    res.status(200).json(beers);
};

// GET piwko po ID
export const getBeerById = (req, res) => {
    const id = parseInt(req.params.id);
    const beer = beers.find(b => b.beer.id === id);
    if (beer) {
        res.status(200).json({
            beer: beer,
            _links: {
                self: { href: `/api/beers/${id}` },
                all: { href: `/api/beers` },
                update: { href: `/api/beers/${id}`, method: 'PUT' },
                patch: { href: `/api/beers/${id}`, method: 'PATCH' },
                delete: { href: `/api/beers/${id}`, method: 'DELETE' },
                flavors: { href: `/api/beers/${id}/attributes/flavors` }
            }
        });
    } else {
        res.status(404).json({ message: 'Piwo nie znalezione' });
    }
};
// Post Nowego Piwka
export const addBeer = (req, res) => {
    const newBeer = {
        beer: {
            id: beers.length + 1,
            details: req.body.details
        }
    };
    beers.push(newBeer);
    res.status(201).json(newBeer);
};

// PUT (pełna aktualizacja) beer po ID
export const updateBeer = (req, res) => {
    const id = parseInt(req.params.id);
    const index = beers.findIndex(b => b.beer.id === id);
    if (index !== -1) {
        beers[index] = { beer: { id, details: req.body.details } };
        res.status(200).json(beers[index]);
    } else {
        res.status(404).json({ message: 'Piwo nie znalezione' });
    }
};

// PATCH (częściowa aktualizacja) beer po ID
export const partialUpdateBeer = (req, res) => {
    const id = parseInt(req.params.id);
    const beer = beers.find(b => b.beer.id === id);
    if (beer) {
        Object.assign(beer.beer.details, req.body.details);
        res.status(200).json(beer);
    } else {
        res.status(404).json({ message: 'Piwo nie znalezione' });
    }
};


export const deleteBeerById = (req, res) => {
    const id = parseInt(req.params.id);
    const index = beers.findIndex(b => b.beer.id === id);
    if (index !== -1) {
        beers.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Piwo nie znalezione' });
    }
};

export const searchBeersByTypeAndFlavor = (req, res) => {
    const { type, flavor } = req.params;

    // Filtrujemy piwa na podstawie typu i smaku
    const filteredBeers = beers.filter(beer => {
        const beerDetails = beer.beer.details;
        const matchesType = beerDetails.attributes.type.toLowerCase() === type.toLowerCase();
        const matchesFlavor = beerDetails.attributes.flavors.map(f => f.toLowerCase()).includes(flavor.toLowerCase());

        return matchesType && matchesFlavor;
    });

    // Sprawdzenie, czy znaleziono jakiekolwiek piwa
    if (filteredBeers.length > 0) {
        res.status(200).json(filteredBeers);
    } else {
        res.status(404).json({ message: `Nie znaleziono piw typu ${type} z nutą ${flavor}.` });
    }
};
