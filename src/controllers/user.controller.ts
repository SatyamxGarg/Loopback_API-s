import {inject, intercept} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, HttpErrors, patch, requestBody, post} from '@loopback/rest';
import {EmUserRepository} from '../repositories';
import {getUserIdFromToken} from '../services/token.service';
import {EmUser} from '../models';
import { EmCountriesRepository,EmStatesRepository, EmCitiesRepository} from '../repositories';
import * as bcrypt from 'bcrypt';

@intercept('interceptors.ResponseInterceptor')
export class UserController {
  constructor(
    @repository(EmUserRepository) private userRepository: EmUserRepository,
    @repository(EmCountriesRepository) private countryRepository: EmCountriesRepository,
    @repository(EmStatesRepository) private stateRepository: EmStatesRepository,
    @repository(EmCitiesRepository) private cityRepository: EmCitiesRepository,
  //  @inject('services.tokenService') private tokenService: TokenService,
  ) {}

  @get('/user-details')
  async getUserDetails(
    @param.header.string('Authorization') authorizationHeader: string,
  ): Promise<object> {
    const token = authorizationHeader;
    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);

    const user = await this.userRepository.findById(userId);
      if(!user){
        throw new HttpErrors.NotFound('User not found.');
      }

    return {
      data: { user },
    };
  }

  @patch('/user-details/update')
  async updateUserDetails(
    @param.header.string('Authorization') authorizationHeader: string,
    @requestBody({
      description: 'User details to be updated',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userFirstName: {type: 'string'},
              userLastName: {type: 'string'},
              userAge: {type: 'number'},
              userPhone: {type: 'string'},
              userGender: {type: 'string'},
              userCountry: {type: 'string'},
              userState: {type: 'string'},
              userCity: {type: 'string'},
            },
            required: [
              'userFirstName',
              'userLastName',
              'userAge',
              'userPhone',
              'userGender',
              'userCountry',
              'userState',
              'userCity',
            ],
          },
        },
      },
    })
    userDetails: Partial<EmUser>,
  ): Promise<object> {
    const token = authorizationHeader;

    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);

    try {
       await this.userRepository.updateById(userId, userDetails);
      const user = await this.userRepository.findById(userId);
      return {
        data: { user },
      };
    } catch (err) {
      throw new HttpErrors[404]('User details not updated.');
    }
  }


  @get('/countries')
  async getCountries(
    @param.header.string('Authorization') authorizationHeader: string,
  ): Promise<object> {
    const token = authorizationHeader;
    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');

    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    try {
      const countries = await this.countryRepository.find({
        fields: {
          countryName: true,
          countryId: true,
        },
      });

      return {
        data: { countries },
      };
    } catch (err) {
      throw new HttpErrors.InternalServerError('Error fetching countries.');
    }
  }


  @post('/states')
  async getStates(
    @param.header.string('Authorization') authorizationHeader: string,
    @requestBody({
      description: 'Country name for fetching states',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userCountry: {type: 'string'},
            },
            required: ['userCountry'],
          },
        },
      },
    })
    body: {userCountry: string},
  ): Promise<object> {
    const token = authorizationHeader;
    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    const {userCountry} = body;
    if (!userCountry) {
      throw new HttpErrors.BadRequest('Country is required.');
    }

    const country = await this.countryRepository.findOne({
      where: {countryName: userCountry},
      fields: {countryId: true},
    });

    if (!country) {
      throw new HttpErrors.NotFound('Country not found.');
    }

    try {
      const states = await this.stateRepository.find({
        where: {countryId: country.countryId},
        fields: {
          stateId: true,
          stateName: true,
        },
      });

      return {
        data: {states},
      };
    } catch (err) {
      throw new HttpErrors.InternalServerError('Error fetching states.');
    }
  }


  @post('/cities')
  async getCities(
    @param.header.string('Authorization') authorizationHeader: string,
    @requestBody({
      description: 'State name for fetching cities',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userState: {type: 'string'},
            },
            required: ['userState'],
          },
        },
      },
    })
    body: {userState: string},
  ): Promise<object> {
    const token = authorizationHeader;
    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    const {userState} = body;
    if (!userState) {
      throw new HttpErrors.BadRequest('State is required.');
    }

    const state = await this.stateRepository.findOne({
      where: {stateName: userState},
      fields: {stateId: true},
    });

    if (!state) {
      throw new HttpErrors.NotFound('State not found.');
    }

    try {
      const cities = await this.cityRepository.find({
        where: {stateId: state.stateId},
        fields: {
          cityId: true,
          cityName: true,
        },
      });

      return {
        data: {cities},
      };
    } catch (err) {
      throw new HttpErrors.InternalServerError('Error fetching cities.');
    }
  }


  @patch('/change-password')
  async changePassword(
    @param.header.string('Authorization') authorizationHeader: string,
    @requestBody({
      description: 'Current and new password',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              currentPassword: {type: 'string'},
              newPassword: {type: 'string'},
            },
            required: ['currentPassword', 'newPassword'],
          },
        },
      },
    })
    passwordDetails: {currentPassword: string; newPassword: string},
  ): Promise<object> {
    const token = authorizationHeader;

    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    const {currentPassword, newPassword} = passwordDetails;
    if (!currentPassword || !newPassword) {
      throw new HttpErrors.BadRequest('Password fields cannot be empty.');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpErrors.NotFound('User not found.');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.userPassword);
    if (!isMatch) {
      throw new HttpErrors.BadRequest('Current password does not match.');
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      throw new HttpErrors.BadRequest('New password is invalid.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      await this.userRepository.updateById(userId, {userPassword: hashedPassword});
      return {
      };
    } catch (err) {
      throw new HttpErrors.InternalServerError('Error updating password.');
    }
  }
}
