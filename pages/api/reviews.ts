import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

const PLACE_ID = 'ChIJOc1Qknjvrw0RTqSZ3I-Uib4';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: 'Missing GOOGLE_PLACES_API_KEY. Add it to .env.local or .env.',
    });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews,formatted_address,url&language=fr&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return res.status(500).json({
        success: false,
        message: data.error_message || `Google Places API error: ${data.status}`,
      });
    }

    const place = data.result;
    const reviews = (place.reviews || []).slice(0, 5).map((review: any) => ({
      author_name: review.author_name,
      rating: review.rating,
      text: review.text,
      relative_time_description: review.relative_time_description,
      profile_photo_url: review.profile_photo_url,
    }));

    return res.status(200).json({
      success: true,
      rating: place.rating,
      total_reviews: place.user_ratings_total,
      reviews,
    });
  } catch (error: any) {
    console.error('Error fetching Google reviews:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch reviews',
    });
  }
}
