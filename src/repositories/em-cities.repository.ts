import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsersDataSource} from '../datasources';
import { EmCitiesRelations,EmCities } from '../models/em-cities.model';

export class EmCitiesRepository extends DefaultCrudRepository<
  EmCities,
  typeof EmCities.prototype.cityId,
  EmCitiesRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(EmCities, dataSource);
  }
}
