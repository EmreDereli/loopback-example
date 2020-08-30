import {Count, CountSchema, repository, Where} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Employee, Manager} from '../models';
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

  @post('/managers/{id}/employees', {
    responses: {
      '200': {
        description: 'Manager model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Manager.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployeeInManager',
            exclude: ['id'],
            optional: ['managerId'],
          }),
        },
      },
    })
    employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.managerRepository.employees(id).create(employee);
  }

  @patch('/managers/{id}/employees', {
    responses: {
      '200': {
        description: 'Manager.Employee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Partial<Employee>,
    @param.query.object('where', getWhereSchemaFor(Employee))
    where?: Where<Employee>,
  ): Promise<Count> {
    return this.managerRepository.employees(id).patch(employee, where);
  }

  @del('/managers/{id}/employees', {
    responses: {
      '200': {
        description: 'Manager.Employee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employee))
    where?: Where<Employee>,
  ): Promise<Count> {
    return this.managerRepository.employees(id).delete(where);
  }
}
