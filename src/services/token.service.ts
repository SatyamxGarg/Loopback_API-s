import * as jwt from 'jsonwebtoken';
import { HttpErrors } from '@loopback/rest';

const SECRET_KEY = 'skjsksatyamshwhwqsnitikajwkwforeverfdfsw';

export async function getUserIdFromToken(token: string): Promise<number> {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    const userIdString= decoded.userId || null;
    if (!userIdString) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }
    const userId = parseInt(userIdString, 10);
    if (isNaN(userId)) {
      throw new HttpErrors.Unauthorized('Failed to fetch userId from token.');
    }
    return userId;
  } catch (error) {
    throw new HttpErrors.InternalServerError('Error occurs while fetching userId from token.')
  }
}
