import {Entity, model, property} from '@loopback/repository';

@model()
export class Title extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'number',
  })
  departmentId?: number;

  constructor(data?: Partial<Title>) {
    super(data);
  }
}

export interface TitleRelations {
  // describe navigational properties here
}

export type TitleWithRelations = Title & TitleRelations;
