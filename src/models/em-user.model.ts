import {Entity, model, property} from '@loopback/repository';

@model()
export class EmUser extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  userId?: number;

  @property({
    type: 'string',
    required: true,
  })
  userFirstName: string;

  @property({
    type: 'string',
    required: true,
  })
  userLastName: string;

  @property({
    type: 'number',
  })
  userPhone?: number;

  @property({
    type: 'string',
    required: true,
  })
  userEmail: string;

  @property({
    type: 'string',
    required: true,
  })
  userPassword: string;

  @property({
    type: 'number',
  })
  userAge?: number;

  @property({
    type: 'number',
    default: 2,
  })
  userRoleId?: number;

  @property({
    type: 'string',
  })
  userCountry?: string;

  @property({
    type: 'string',
  })
  userState?: string;

  @property({
    type: 'string',
  })
  userCity?: string;

  @property({
    type: 'date',
  })
  userCreatedAt?: string;

  @property({
    type: 'date',
  })
  userUpdatedAt?: string;

  @property({
    type: 'date',
    default: null,
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