import { NextApiRequest, NextApiResponse } from 'next'
import { pageData } from '../../../utils/page-data'

const pageHandler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    setTimeout(() => {
      return res.status(200).json(pageData)
    }, 2000);
    
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default pageHandler
