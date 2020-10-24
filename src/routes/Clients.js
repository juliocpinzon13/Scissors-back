const express = require('express');
const router = express.Router();

const Client = require('../models/Client');

router.get('/', async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

router.post('/', async (req, res) => {
  const client = new Client(req.body);
  await client.save();
  res.json({
    status: 'Client saved'
  })
});

router.put('/:id', async (req, res) => {
  await Client.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Client updated'
  })
});

router.delete('/:id', async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({
    status: 'Client deleted'
  })
});

router.get('/:id', async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.json(client)
});

module.exports = router;