import User from '../models/user.model';

export const addFavorite = async (req: any, res: any) => {
  const { propertyId } = req.body;
  const user = await User.findByIdAndUpdate(req.userId, {
    $addToSet: { favorites: propertyId }
  }, { new: true });
  res.json(user);
};

export const getFavorites = async (req: any, res: any) => {
  const user = await User.findById(req.userId).populate('favorites');
  res.json(user?.favorites);
};

export const removeFavorite = async (req: any, res: any) => {
  const { propertyId } = req.body;
  const user = await User.findByIdAndUpdate(req.userId, {
    $pull: { favorites: propertyId }
  }, { new: true });
  res.json(user);
};
