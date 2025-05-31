// import Property from '../models/property.model';
// import { redis } from '../config/redis';

// export const createProperty = async (req: any, res: any) => {
//   const property = await Property.create({ ...req.body, createdBy: req.userId });
//   await redis.del('properties');
//   res.json(property);
// };

// export const getAllProperties = async (req: any, res: any) => {
//   const cached = await redis.get('properties');
//   if (cached) return res.json(JSON.parse(cached));

//   const properties = await Property.find();
//   await redis.set('properties', JSON.stringify(properties));
//   res.json(properties);
// };

// export const updateProperty = async (req: any, res: any) => {
//   const prop = await Property.findById(req.params.id);
//   if (!prop || !prop.createdBy || prop.createdBy.toString() !== req.userId)
//     return res.status(403).json({ error: 'Not allowed' });

//   const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   await redis.del('properties');
//   res.json(updated);
// };

// export const deleteProperty = async (req: any, res: any) => {
//   const prop = await Property.findById(req.params.id);
//   if (!prop || !prop.createdBy || prop.createdBy.toString() !== req.userId)
//     return res.status(403).json({ error: 'Not allowed' });

//   await Property.findByIdAndDelete(req.params.id);
//   await redis.del('properties');
//   res.json({ success: true });
// };


import Property from '../models/property.model';
import { redis } from '../config/redis';

export const createProperty = async (req: any, res: any) => {
  try {
    const property = await Property.create({ ...req.body, createdBy: req.userId });
    await redis.del('properties');
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create property' });
  }
};

export const getAllProperties = async (req: any, res: any) => {
  try {
    const cached = await redis.get('properties');
    if (cached) return res.json(JSON.parse(cached));

    const properties = await Property.find();
    await redis.set('properties', JSON.stringify(properties));
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// New function to get a single property by ID with Redis caching
export const getPropertyById = async (req: any, res: any) => {
  const propertyId = req.params.id;
  try {
    const cached = await redis.get(`property:${propertyId}`);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Cache the property data for 1 hour (3600 seconds)
    await redis.setex(`property:${propertyId}`, 3600, JSON.stringify(property));
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProperty = async (req: any, res: any) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop || !prop.createdBy || prop.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await redis.del('properties');
    await redis.del(`property:${req.params.id}`);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update property' });
  }
};

export const deleteProperty = async (req: any, res: any) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop || !prop.createdBy || prop.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    await Property.findByIdAndDelete(req.params.id);
    await redis.del('properties');
    await redis.del(`property:${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete property' });
  }
};
