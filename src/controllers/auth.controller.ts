import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {EmUser} from '../models';
import {EmUserRepository} from '../repositories';
import {HttpErrors} from '@loopback/rest';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export class AuthController {
  constructor(
    @repository(EmUserRepository)
    public emUserRepository: EmUserRepository,
  ) {}

  @post('/signup')
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userFirstName: {type: 'string'},
              userLastName: {type: 'string'},
              userEmail: {type: 'string'},
              userPassword: {type: 'string'},
            },
            required: ['userFirstName', 'userLastName', 'userEmail', 'userPassword'],
          },
        },
      },
    })
    userData: Omit<EmUser, 'userId'>,
  ): Promise<EmUser> {
     if (!EMAIL_REGEX.test(userData.userEmail)) {
      throw new HttpErrors.BadRequest('Invalid email format.');
    }

    if (!PASSWORD_REGEX.test(userData.userPassword)) {
      throw new HttpErrors.BadRequest('Password must be at least 8 characters long and include at least one uppercase, one lowercase, one digit and one special character.');
    }

    const existingUser = await this.emUserRepository.findOne({
      where: {userEmail: userData.userEmail},
    });
    if (existingUser) {
      throw new HttpErrors.BadRequest('Email already exists.');
    }

    userData.userPassword = await bcrypt.hash(userData.userPassword, 10);

    return this.emUserRepository.create(userData);
  }

  @post('/signin')
  async signin(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userEmail: {type: 'string'},
              userPassword: {type: 'string'},
            },
            required: ['userEmail', 'userPassword'],
          },
        },
      },
    })
    credentials: {userEmail: string; userPassword: string},
  ): Promise<{token: string}> {
    const user = await this.emUserRepository.findOne({
      where: {userEmail: credentials.userEmail},
    });

    if (!user) {
      throw new HttpErrors.Unauthorized('Invalid email or password.');
    }

    // Verify the password
    const passwordIsValid = await bcrypt.compare(
      credentials.userPassword,
      user.userPassword!,
    );
    if (!passwordIsValid) {
      throw new HttpErrors.Unauthorized('Invalid email or password.');
    }

    // Create a JWT token
    const token = jwt.sign(
      {userId: user.userId, userEmail: user.userEmail},
      'SECRET_KEY', // Replace with a real secret key
      {expiresIn: '10h'},
    );

    return {token};
  }
}
