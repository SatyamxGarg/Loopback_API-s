import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {tableName: 'em_roles'},
  },
})
export class EmRoles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'role_id',
    },
  })
  roleId: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'role_name',
    },
  })
  roleName: string;

  constructor(data?: Partial<EmRoles>) {
    super(data);
  }
}

export interface EmRolesRelations {
  // describe navigational properties here
}

export type EmRolesWithRelations = EmRoles & EmRolesRelations;
