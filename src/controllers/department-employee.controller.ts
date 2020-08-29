import {Filter, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Employee} from '../models';
import {DepartmentRepository} from '../repositories';

export class DepartmentEmployeeController {
  constructor(
    @repository(DepartmentRepository)
    protected departmentRepository: DepartmentRepository,
  ) {}

  @get('/departments/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Department has many Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.departmentRepository.employees(id).find(filter);
  }

  @get('/departments/{id}/salary', {
    responses: {
      '200': {
        description: 'Array of Department has many Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async calculateAverageSalary(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employee>,
  ) {
    const data = await this.departmentRepository.employees(id).find(filter);
    let total = 0;
    data.map(employee => {
      total += employee.salary;
    });
    return {
      averageSalary: total / data.length,
    };
  }
}
