import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee} from './employee.model';
import {Title} from './title.model';

@model()
export class Department extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  manager: string;

  @hasMany(() => Employee)
  employees: Employee[];

  @hasMany(() => Title)
  titles: Title[];

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
