import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsersDataSource} from '../datasources';
import { EmRoles, EmRolesRelations } from '../models/em-roles.model';

export class EmRolesRepository extends DefaultCrudRepository<
  EmRoles,
  typeof EmRoles.prototype.roleId,
  EmRolesRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(EmRoles, dataSource);
  }
}
