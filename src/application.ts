import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {ResponseInterceptor} from './interceptors/response.interceptor';
import { EmCountriesRepository, EmRolesRepository, EmUserRepository } from './repositories';
import {EmCitiesRepository} from './repositories';
import {EmStatesRepository} from './repositories';
import {UsersDataSource} from './datasources/users.datasource';
import {EmRoles} from './models/em-roles.model';
import {EmCountries} from './models/em-countries.model';
// import {TokenService} from './services/token.service';

export {ApplicationConfig};

export class EmpApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.interceptor(ResponseInterceptor);
    this.sequence(MySequence);
    this.static('/', path.join(__dirname, '../public'));
    this.repository(EmUserRepository);
    // this.bind('services.tokenService').toClass(TokenService);

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;

    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async boot() {
    await super.boot();

    // Register models, repositories, and data sources after the boot phase
    this.dataSource(UsersDataSource);
    this.repository(EmRolesRepository);
    this.repository(EmCountriesRepository)
    this.model(EmRoles);
    this.model(EmCountries);

    await this.migrateSchema(); // Migrate schema

    this.seedData(); // Call seed function on startup
  }

  async seedData() {
    const rolesRepo = await this.getRepository(EmRolesRepository);
    const rolesCount = await rolesRepo.count();

    if (rolesCount.count === 0) {
      const roles=[
        {
          roleName: 'Team Lead',
        },
        {
          roleName: 'Developer',
        },
        {
          roleName: 'Senior Developer',
        },
        {
          roleName: 'Junior Developer',
        },
        {
          roleName: 'Manager',
        },
        {
          roleName: 'HR',
        },
      ];
      await rolesRepo.createAll(roles);
      console.log('Seed data inserted');
    }

    const countryRepo = await this.getRepository(EmCountriesRepository);
    const countryCount = await countryRepo.count();
    if (countryCount.count === 0) {
      const countries=[
        {
          countryName: 'India',
        },
        {
          countryName: 'USA',
        },
      ];
      await countryRepo.createAll(countries);
      console.log('Seed data inserted');
    }


    const stateRepo = await this.getRepository(EmStatesRepository);
    const stateCount = await stateRepo.count();
    if (stateCount.count === 0) {
      const states=[
        {
          stateName: 'Haryana',
          countryId: 1,
        },
        {
          stateName: 'Punjab',
          countryId: 1,
        },
        {
          stateName: 'California',
          countryId: 2,
        },
        {
          stateName: 'New York',
          countryId: 2,
        },
      ];
      await stateRepo.createAll(states);
      console.log('Seed data inserted');
    }

    const cityRepo = await this.getRepository(EmCitiesRepository);
    const cityCount = await cityRepo.count();
    if (cityCount.count === 0) {
      const cities=[
        {
          cityName: 'Yamuna Nagar',
          stateId: 1,
        },
        {
          cityName: 'Ambala',
          stateId: 1,
        },
        {
          cityName: 'Mohali',
          stateId: 2,
        },
        {
          cityName: 'Amritsar',
          stateId: 2,
        },
        {
          cityName: 'Los Angeles',
          stateId: 3,
        },
        {
          cityName: 'San Diego',
          stateId: 3,
        },
        {
          cityName: 'Yonkers',
          stateId: 4,
        },
        {
          cityName: 'Rochesters',
          stateId: 4,
        },
      ];
      await cityRepo.createAll(cities);
      console.log('Seed data inserted');
    }
  }
}

