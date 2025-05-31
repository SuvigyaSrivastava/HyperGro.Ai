import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import Property from '../models/property.model';
import { connectDB } from '../config/db';

const filePath = path.join(__dirname, '../../assets/properties.csv');

const importProperties = async () => {
  await connectDB();
  const results: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        id: data.id,
        title: data.title,
        type: data.type,
        price: parseFloat(data.price),
        state: data.state,
        city: data.city,
        areaSqFt: parseInt(data.areaSqFt),
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        amenities: data.amenities?.split(',').map((a: string) => a.trim()) || [],
        furnished: data.furnished,
        availableFrom: data.availableFrom,
        listedBy: data.listedBy,
        tags: data.tags?.split(',').map((t:string) => t.trim()) || [],
        colorTheme: data.colorTheme,
        rating: parseFloat(data.rating),
        isVerified: data.isVerified.toLowerCase() === 'true',
        listingType: data.listingType
      });
    })
    .on('end', async () => {
      try {
        await Property.insertMany(results);
        console.log(`✅ Imported ${results.length} properties`);
        process.exit();
      } catch (err) {
        console.error('❌ Failed to import:', err);
        process.exit(1);
      }
    });
};

importProperties();
