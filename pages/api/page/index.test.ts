import { NextApiRequest, NextApiResponse } from 'next';
import pageHandler from './index';
import { pageData } from '../../../utils/page-data';

// Use fake timers to control setTimeout
jest.useFakeTimers();

describe('pageHandler', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {} as NextApiRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
  });

  it('should return 200 and pageData after 2000ms', () => {
    pageHandler(req, res);

    // Fast-forward time by 2000ms
    jest.advanceTimersByTime(2000);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(pageData);
  });
});