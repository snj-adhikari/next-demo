import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';
import { sortCarsByFamilies } from '../../../utils/helpers';
import { Car, Family } from '../../../interfaces'; // Make sure Family interface is also imported

const carsHandler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }

    const carsWithSortedFamilies: Car[] = sortCarsByFamilies([...sampleUserData]as Car[]);

    return res.status(200).json(carsWithSortedFamilies); // Send the data with sorted families
 

  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default carsHandler;