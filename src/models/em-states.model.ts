import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {EmCities} from './em-cities.model';
import {EmCountries} from './em-countries.model';

@model({
  settings: {
    postgresql: {tableName: 'em_states'},
    foreignKeys: {
      fkCountryId: {
        name: 'fk_country_id',
        entity: 'EmCountries',
        entityKey: 'country_id',
        foreignKey: 'countryid',
      },
    },
  },
})
export class EmStates extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {columnName: 'state_id'},
  })
  stateId: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'state_name'},
  })
  stateName: string;

  @belongsTo(() => EmCountries, {name: 'country'})
  countryId: number;
  @hasMany(() => EmCities, {keyTo: 'stateId'})
  cities: EmCities[];

  constructor(data?: Partial<EmStates>) {
    super(data);
  }
}

export interface EmStatesRelations {
  // describe navigational properties here
}

export type EmStatesWithRelations = EmStates & EmStatesRelations;
