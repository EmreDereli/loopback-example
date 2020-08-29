import {Entity, model, property} from '@loopback/repository';

@model()
export class Employee extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @property({
    type: 'date',
    required: true,
  })
  startDateOfWork: string;

  @property({
    type: 'number',
    required: true,
  })
  department: number;

  @property({
    type: 'number',
    required: true,
  })
  salary: number;

  @property({
    type: 'number',
    required: true,
  })
  title: number;

  @property({
    type: 'number',
    required: true,
  })
  manager: number;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
