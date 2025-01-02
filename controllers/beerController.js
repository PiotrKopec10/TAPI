import beers from '../data/beers.json' assert {type: 'json'};



// GET wszystkie piwka
export const getAllBeers = (req, res) => {
    try {
        res.set("Content-Type", "application/json");
        res.set("X-Powered-By", "BeerAPI"); 
        res.status(200).json(beers);
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd po stronie serwera', error });
    }
};

// GET piwko po ID
export const getBeerById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Nieprawidłowe ID' });
    }

    try {
        const beer = beers.piwka.find(b => b.id === id);
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
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd po stronie serwera', error });
    }
};

// POST Nowego Piwka
export const addBeer = (req, res) => {
    try {
        const { name, iloscAlkoholu, subName, skladSmaku, smaki } = req.body;
        
        if (!name || !iloscAlkoholu || !subName || !smaki) {
            return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
        }

        const newBeer = {
            id: beers.piwka.length + 1,
            name,
            iloscAlkoholu,
            subName,
            skladSmaku,
            smaki
        };

        beers.piwka.push(newBeer);
        res.status(201).json(newBeer);
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd po stronie serwera', error });
    }
};

// PUT (pełna aktualizacja) beer po ID
export const updateBeer = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Nieprawidłowe ID' });
    }

    try {
        const index = beers.piwka.findIndex(b => b.id === id);
        if (index !== -1) {
            const { name, iloscAlkoholu, subName, skladSmaku, smaki } = req.body;

            if (!name || !iloscAlkoholu || !subName || !smaki) {
                return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
            }

            beers.piwka[index] = {
                id,
                name,
                iloscAlkoholu,
                subName,
                skladSmaku,
                smaki
            };
            res.status(200).json(beers.piwka[index]);
        } else {
            res.status(404).json({ message: 'Piwo nie znalezione' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd po stronie serwera', error });
    }
};

// PATCH (częściowa aktualizacja) beer po ID
export const partialUpdateBeer = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Nieprawidłowe ID' });
    }

    try {
        const beer = beers.piwka.find(b => b.id === id);
        if (beer) {
            Object.assign(beer, req.body);
            res.status(200).json(beer);
        } else {
            res.status(404).json({ message: 'Piwo nie znalezione' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd po stronie serwera', error });
    }
};

// DELETE beer po ID
export const deleteBeerById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Nieprawidłowe ID' });
    }

    try {
        const index = beers.piwka.findIndex(b => b.id === id);
        if (index !== -1) {
            beers.piwka.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Piwo nie znalezione' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd po stronie serwera', error });
    }
};

export const searchBeers = (req, res) => {
    const { type, flavor, note } = req.query;

    try {
        // Filtrujemy piwa na podstawie typu, smaku i szczegółowego smaku, jeśli są podane
        const filteredBeers = beers.piwka.filter(beer => {
            const matchesType = type ? beer.subName.toLowerCase() === type.toLowerCase() : true;
            const matchesFlavorAndNote = flavor && note
                ? beer.skladSmaku.smaki.some(smakId => {
                      const flavorObj = beers.nutySmakowe.find(
                          n => n.id === smakId && n.nazwa.toLowerCase() === flavor.toLowerCase()
                      );
                      return flavorObj && flavorObj.numerySmakowe.some(num => num.name.toLowerCase() === note.toLowerCase());
                  })
                : flavor && !note
                ? beer.skladSmaku.smaki.some(smakId => {
                      const flavorObj = beers.nutySmakowe.find(
                          n => n.id === smakId && n.nazwa.toLowerCase() === flavor.toLowerCase()
                      );
                      return !!flavorObj;
                  })
                : true;

            return matchesType && matchesFlavorAndNote;
        });

        // Zwraca wszystkie piwa, jeśli brak filtrów lub tylko spełniające kryteria
        if (filteredBeers.length > 0) {
            res.status(200).json(filteredBeers);
        } else {
            res.status(404).json({ message: 'Nie znaleziono piw spełniających podane kryteria.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd po stronie serwera', error });
    }
};