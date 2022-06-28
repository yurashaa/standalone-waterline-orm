const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const pets = await models.pet.find().populate('owner')

    res.send(pets);
});

router.post('/', async (req, res) => {
    const { name, type, owner } = req.body;

    const user = await models.user.findOne({ id: owner });

    if (owner && !user) {
        throw new Error('No owner with id: ' + owner);
    }

    const pet = await models.pet.create({
        name,
        type,
        owner: user?.id
    }).fetch();

    res.send(pet);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const updatedPet = await models.pet.updateOne({ id }).set(req.body);

    res.send(updatedPet);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const deletedPet = await models.pet.destroyOne({ id }).fetch();

    res.send(deletedPet);
});

module.exports = router;
