import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {tableName: 'em_countries'},
  },
})
export class EmCountries extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {columnName: 'country_id'}, 
  })
  countryId: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'country_name'}, 
  })
  countryName: string;

  constructor(data?: Partial<EmCountries>) {
    super(data);
  }
}

export interface EmCountriesRelations {
  // describe navigational properties here
}

export type EmCountriesWithRelations = EmCountries & EmCountriesRelations;
