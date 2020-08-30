import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
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
import {
  Title,
  Employee,
} from '../models';
import {TitleRepository} from '../repositories';

export class TitleEmployeeController {
  constructor(
    @repository(TitleRepository) protected titleRepository: TitleRepository,
  ) { }

  @get('/titles/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Title has many Employee',
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
    return this.titleRepository.employees(id).find(filter);
  }

  @post('/titles/{id}/employees', {
    responses: {
      '200': {
        description: 'Title model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Title.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployeeInTitle',
            exclude: ['id'],
            optional: ['titleId']
          }),
        },
      },
    }) employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.titleRepository.employees(id).create(employee);
  }

  @patch('/titles/{id}/employees', {
    responses: {
      '200': {
        description: 'Title.Employee PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.titleRepository.employees(id).patch(employee, where);
  }

  @del('/titles/{id}/employees', {
    responses: {
      '200': {
        description: 'Title.Employee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employee)) where?: Where<Employee>,
  ): Promise<Count> {
    return this.titleRepository.employees(id).delete(where);
  }
}
