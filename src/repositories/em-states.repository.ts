import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsersDataSource} from '../datasources';
import { EmStates,EmStatesRelations } from '../models/em-states.model';

export class EmStatesRepository extends DefaultCrudRepository<
  EmStates,
  typeof EmStates.prototype.stateId,
  EmStatesRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(EmStates, dataSource);
  }
}
