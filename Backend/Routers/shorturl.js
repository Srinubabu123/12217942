const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const { nanoid } = require('nanoid');

router.post('/shorturls', async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  const expiry = new Date(Date.now() + validity * 60000);

  let shortCode = shortcode || nanoid(6);

  let existing = await Url.findOne({ shortCode });
  if (existing) {
    return res.status(409).json({ error: 'Shortcode already in use' });
  }

  const newUrl = new Url({
    originalUrl: url,
    shortCode,
    expiryDate: expiry
  });

  await newUrl.save();

  res.status(201).json({
  shortLink: `http://localhost:5000/${shortCode}`,
  expiry: expiry.toISOString()
    });
});

router.get('/shorturls/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  const urlData = await Url.findOne({ shortCode: shortcode });

  if (!urlData) return res.status(404).json({ error: 'Shortcode not found' });

  res.json({
    totalClicks: urlData.clicks.length,
    originalUrl: urlData.originalUrl,
    createdAt: urlData.createdAt,
    expiryDate: urlData.expiryDate,
    clicks: urlData.clicks
  });
});

router.get('/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  const urlData = await Url.findOne({ shortCode: shortcode });

  if (!urlData) return res.status(404).send('Link not found or expired');

  if (new Date() > urlData.expiryDate) return res.status(410).send('Link expired');

  urlData.clicks.push({
    referrer: req.get('Referrer') || 'Direct',
    geo: req.ip
  });

  await urlData.save();
  res.redirect(urlData.originalUrl);
});

module.exports = router;
