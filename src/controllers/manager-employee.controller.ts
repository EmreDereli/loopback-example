import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Employee} from '../models';
import {ManagerRepository} from '../repositories';

export class ManagerEmployeeController {
  constructor(
    @repository(ManagerRepository)
    protected managerRepository: ManagerRepository,
  ) {}

  @get('/managers/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Manager has many Employee hierarchically (DESC)',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async find(@param.path.number('id') id: number): Promise<Employee[]> {
    return this.managerRepository.employees(id).find({
      where: {
        managerId: id,
      },
      order: ['startDateOfWork DESC'],
    });
  }
}
