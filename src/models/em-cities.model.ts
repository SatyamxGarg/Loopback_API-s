import {Entity, model, property, belongsTo} from '@loopback/repository';
import {EmStates} from './em-states.model';

@model({
  settings: {
    postgresql: {tableName: 'em_cities'},
    foreignKeys: {
      fkStateId: {
        name: 'fk_state_id',
        entity: 'EmStates',
        entityKey: 'state_id',
        foreignKey: 'stateid',
      },
    },
  },
})
export class EmCities extends Entity {
  @belongsTo(() => EmStates, {name: 'state'})
  stateId: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {columnName: 'city_id'},
  })
  cityId: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'city_name'},
  })
  cityName: string;

  constructor(data?: Partial<EmCities>) {
    super(data);
  }
}

export interface EmCitiesRelations {
  // describe navigational properties here
}

export type EmCitiesWithRelations = EmCities & EmCitiesRelations;
