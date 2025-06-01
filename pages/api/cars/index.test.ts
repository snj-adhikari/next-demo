import { NextApiRequest, NextApiResponse } from 'next';
import carsHandler from './index';
import { sampleUserData } from '../../../utils/sample-data';

// Use fake timers to simulate the setTimeout delay
jest.useFakeTimers();

describe('carsHandler', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {} as NextApiRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
  });

  it('should return 200 with sampleUserData when user data is an array', () => {
    carsHandler(req, res);

    // Fast-forward the timer
    jest.advanceTimersByTime(4000);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(sampleUserData);
  });

  it('should return 500 with an error message if sampleUserData is not an array', () => {
    // Use isolateModules so that the module override does not affect other tests
    jest.isolateModules(() => {
      // Override the sampleUserData to simulate the error case
      jest.doMock('../../../utils/sample-data', () => ({
        sampleUserData: null, // non-array value triggers the error
      }));
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { default: carsHandlerWithMockData } = require('./index');
      const reqMock = {} as NextApiRequest;
      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as NextApiResponse;

      // Since the error is thrown synchronously before the setTimeout, no need to advance timers
      carsHandlerWithMockData(reqMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({ statusCode: 500, message: 'Cannot find user data' });
    });
  });
});