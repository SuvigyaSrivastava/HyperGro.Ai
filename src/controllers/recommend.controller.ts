import User from '../models/user.model';

export const recommendProperty = async (req: any, res: any) => {
  const { recipientEmail, propertyId } = req.body;
  const recipient = await User.findOne({ email: recipientEmail });
  if (!recipient) return res.status(404).json({ error: 'Recipient not found' });

  recipient.recommendations.push(propertyId);
  await recipient.save();
  res.json({ success: true });
};

export const getRecommendations = async (req: any, res: any) => {
  const user = await User.findById(req.userId).populate('recommendations');
  res.json(user?.recommendations);
};
