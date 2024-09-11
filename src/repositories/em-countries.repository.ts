import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsersDataSource} from '../datasources';
import { EmCountries, EmCountriesRelations } from '../models/em-countries.model';

export class EmCountriesRepository extends DefaultCrudRepository<
  EmCountries,
  typeof EmCountries.prototype.countryId,
  EmCountriesRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(EmCountries, dataSource);
  }
}
