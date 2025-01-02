let breweries = []; // Przykładowa baza danych w pamięci dla browarów

// GET wszystkie browary
export const getAllBreweries = (req, res) => {
    res.set("Content-Type", "application/json");
    res.status(200).json(breweries);
};

// GET browar po ID
export const getBreweryById = (req, res) => {
    const id = parseInt(req.params.id);
    const brewery = breweries.find(b => b.id === id);
    if (brewery) {
        res.set("Content-Type", "application/json");
        res.status(200).json(brewery);
    } else {
        res.status(404).json({ message: 'Browar nie znaleziony' });
    }
};

// POST nowy browar
export const addBrewery = (req, res) => {
    const { name, location } = req.body;
    if (!name || !location) {
        res.status(400).json({ message: 'Brak wymaganych danych' });
    } else {
        const newBrewery = { id: breweries.length + 1, name, location };
        breweries.push(newBrewery);
        res.set("Content-Type", "application/json");
        res.status(201).json(newBrewery);
    }
};

// PUT aktualizacja browaru
export const updateBrewery = (req, res) => {
    const id = parseInt(req.params.id);
    const index = breweries.findIndex(b => b.id === id);
    if (index !== -1) {
        const { name, location } = req.body;
        breweries[index] = { id, name, location };
        res.set("Content-Type", "application/json");
        res.status(200).json(breweries[index]);
    } else {
        res.status(404).json({ message: 'Browar nie znaleziony' });
    }
};

// DELETE browar
export const deleteBreweryById = (req, res) => {
    const id = parseInt(req.params.id);
    const index = breweries.findIndex(b => b.id === id);
    if (index !== -1) {
        breweries.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Browar nie znaleziony' });
    }
};


export const partialUpdateBrewery = (req, res) => {
    const id = parseInt(req.params.id);
    const brewery = breweries.find(b => b.id === id);
    if (brewery) {
        Object.assign(brewery, req.body); 
        res.set("Content-Type", "application/json");
        res.status(200).json(brewery);
    } else {
        res.status(404).json({ message: 'Browar nie znaleziony' });
    }
};