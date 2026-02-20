const express = require('express');
const router = express.Router();
const Component = require('../models/Component');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');

// GET all components - public
router.get('/', async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new component - admin only
router.post('/', auth, checkRole('admin'), async (req, res) => {
  const component = new Component({
    name: req.body.name,
    status: req.body.status,
    notes: req.body.notes,
    updatedBy: req.body.updatedBy
  });
  try {
    const newComponent = await component.save();
    res.status(201).json(newComponent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH - admin only
router.patch('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ message: 'Not found' });

    const oldStatus = component.status;
    component.status = req.body.status || component.status;
    component.notes = req.body.notes || component.notes;
    component.updatedBy = req.body.updatedBy || component.updatedBy;

    if (req.body.status && req.body.status !== oldStatus) {
      component.activityLog.push({
        changedTo: req.body.status,
        changedBy: req.body.updatedBy || 'unknown'
      });
    }

    const updated = await component.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - admin only
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
  try {
    const component = await Component.findByIdAndDelete(req.params.id)
    if (!component) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Component deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router;