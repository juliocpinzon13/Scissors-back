const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const stylists = await Stylist.find();
  res.json(stylists);
});

router.post('/', async (req, res) => {
  const stylist = new Stylist(req.body);
  await stylist.save();
  res.json({
    status: 'Stylist saved'
  })
});

router.put('/:id', async (req, res) => {
  await Stylist.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Stylist updated'
  })
});

router.delete('/:id', async (req, res) => {
  await Stylist.findByIdAndDelete(req.params.id);
  res.json({
    status: 'Stylist deleted'
  })
});

router.get('/:id', async (req, res) => {
  const stylist = await Stylist.findById(req.params.id);
  res.json(stylist)
});

module.exports = router;