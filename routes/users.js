const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await models.user.find();

  res.send(users);
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await models.user.create({
    name,
    email,
    password
  }).fetch();

  res.send(user);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const updatedUser = await models.user.updateOne({ id }).set(req.body).fetch();

  res.send(updatedUser);
});

router.patch('/:id/pets', async (req, res) => {
  const { id } = req.params;
  const { pets } = req.body;

  const updatedUser = await models.user.addToCollection(id, 'pets').members(pets);

  res.send(updatedUser);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deletedUser = await models.user.destroy({ id }).fetch();

  res.send(deletedUser);
});

module.exports = router;
