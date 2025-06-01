import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';

const carsHandler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data');
    }
    setTimeout(() => {
      return res.status(200).json(sampleUserData);
    }, 4000);
    
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ statusCode: 500, message });
  }
}

export default carsHandler;