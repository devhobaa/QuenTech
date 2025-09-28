// Vercel API endpoint for contacts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Return mock data for now
      res.status(200).json({ 
        success: true, 
        data: [] 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch contacts' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
