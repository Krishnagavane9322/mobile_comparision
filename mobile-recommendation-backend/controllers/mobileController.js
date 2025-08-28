const Mobile = require('../models/mobile');

// GET /api/mobiles?page=1&limit=10&sort=price:asc,rating:desc&brand=Samsung&minPrice=300&maxPrice=1200
exports.getMobiles = async (req, res) => {
  try {
    const {
      page = 1, limit = 10, sort = 'price:asc',
      brand, minPrice, maxPrice, ram, storage
    } = req.query;

    const query = {};
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) query.price = {
      ...(minPrice ? { $gte: Number(minPrice) } : {}),
      ...(maxPrice ? { $lte: Number(maxPrice) } : {})
    };
    if (ram) query.ram = { $gte: Number(ram) };
    if (storage) query.storage = { $gte: Number(storage) };

    const sortObj = {};
    for (const rule of String(sort).split(',')) {
      const [field, dir = 'asc'] = rule.split(':');
      sortObj[field] = dir === 'desc' ? -1 : 1;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Mobile.find(query).sort(sortObj).skip(skip).limit(Number(limit)),
      Mobile.countDocuments(query),
    ]);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
      items
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/mobiles/:id
exports.getMobileById = async (req, res) => {
  try {
    const mobile = await Mobile.findById(req.params.id);
    if (!mobile) {
      return res.status(404).json({ error: 'Mobile not found' });
    }
    res.json(mobile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/mobiles (admin add)
exports.addMobile = async (req, res) => {
  try {
    const mobile = new Mobile(req.body);
    const savedMobile = await mobile.save();
    res.status(201).json(savedMobile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/mobiles/recommend  (supports pagination/sort too)
exports.recommendMobiles = async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, ram, storage, page = 1, limit = 5, sort = 'price:asc' } = req.body;

    const query = {};
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) query.price = {
      ...(minPrice ? { $gte: Number(minPrice) } : {}),
      ...(maxPrice ? { $lte: Number(maxPrice) } : {})
    };
    if (ram) query.ram = { $gte: Number(ram) };
    if (storage) query.storage = { $gte: Number(storage) };

    const sortObj = {};
    for (const rule of String(sort).split(',')) {
      const [field, dir = 'asc'] = rule.split(':');
      sortObj[field] = dir === 'desc' ? -1 : 1;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Mobile.find(query).sort(sortObj).skip(skip).limit(Number(limit)),
      Mobile.countDocuments(query),
    ]);

    res.json({ page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)), items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
