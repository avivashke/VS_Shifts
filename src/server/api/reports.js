const express = require('express');
const router = express.Router();
const reportScheduler = require('../../services/reportScheduler');

router.post('/schedule', async (req, res) => {
  try {
    const schedules = req.body;
    reportScheduler.updateSchedules(schedules);
    res.json({ message: 'Report schedules updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;