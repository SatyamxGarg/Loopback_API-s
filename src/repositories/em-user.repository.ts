import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsersDataSource} from '../datasources';
import {EmUser, EmUserRelations} from '../models';

export class EmUserRepository extends DefaultCrudRepository<
  EmUser,
  typeof EmUser.prototype.userId,
  EmUserRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(EmUser, dataSource);
  }
}
