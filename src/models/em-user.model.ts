import {Entity, model, property} from '@loopback/repository';
import {EmRoles} from './em-roles.model';

@model({
  settings: {
    postgresql: {tableName: 'em_users'},
    foreignKeys: {
      fkUserRoleId: {
        name: 'fkUserRoleId',
        entity: 'EmRoles',
        entityKey: 'role_id',
        foreignKey: 'user_role_id',
      },
    },
  },
})
export class EmUser extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'user_id',
    },
  })
  userId?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'user_first_name',
    },
  })
  userFirstName: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'user_last_name',
    },
  })
  userLastName: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'user_phone',
    },
  })
  userPhone?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'user_email',
    },
  })
  userEmail: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'user_password',
    },
  })
  userPassword: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'user_gender',
    },
  })
  userGender?: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'user_age',
    },
  })
  userAge?: number;

  @property({
    type: 'number',
    default: 2,
    postgresql: {
      columnName: 'user_role_id',
    },
  })
  userRoleId: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'user_country',
    },
  })
  userCountry?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'user_state',
    },
  })
  userState?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'user_city',
    },
  })
  userCity?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {
      columnName: 'user_created_at',
    },
  })
  userCreatedAt?: string;

  @property({
    type: 'date',
    default: () => new Date(),
    postgresql: {
      columnName: 'user_updated_at',
    },
  })
  userUpdatedAt?: string;

  @property({
    type: 'date',
    default: null,
    postgresql: {
      columnName: 'user_deleted_at',
    },
  })
  userDeletedAt?: string;

  constructor(data?: Partial<EmUser>) {
    super(data);
  }
}

export interface EmUserRelations {
  // describe navigational properties here
}

export type EmUserWithRelations = EmUser & EmUserRelations;
