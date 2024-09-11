import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UsersDataSource} from '../datasources';
import { EmProjects, EmProjectsRelations } from '../models/em-projects.model';

export class EmProjectsRepository extends DefaultCrudRepository<
  EmProjects,
  typeof EmProjects.prototype.projectId,
  EmProjectsRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(EmProjects, dataSource);
  }
}
