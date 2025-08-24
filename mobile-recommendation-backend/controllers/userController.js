const User = require('../models/user');

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.addFavorite = async (req, res) => {
  const { mobileId } = req.params;
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { favorites: mobileId } });
  res.json({ message: 'Added to favorites' });
};

exports.removeFavorite = async (req, res) => {
  const { mobileId } = req.params;
  await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: mobileId } });
  res.json({ message: 'Removed from favorites' });
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  res.json(user.favorites || []);
};
