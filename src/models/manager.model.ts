import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee} from './employee.model';

@model()
export class Manager extends Entity {
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
  managerName: string;

  @property({
    type: 'string',
    required: true,
  })
  managerSurname: string;

  @hasMany(() => Employee)
  employees: Employee[];

  constructor(data?: Partial<Manager>) {
    super(data);
  }
}

export interface ManagerRelations {
  // describe navigational properties here
}

export type ManagerWithRelations = Manager & ManagerRelations;
