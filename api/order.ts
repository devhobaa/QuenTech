// Vercel API endpoint for orders
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, serviceType, description } = req.body;
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        data: {
          id: Date.now(),
          name,
          email,
          phone,
          serviceType,
          description,
          createdAt: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to create order' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
