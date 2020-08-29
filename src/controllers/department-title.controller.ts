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
  Department,
  Title,
} from '../models';
import {DepartmentRepository} from '../repositories';

export class DepartmentTitleController {
  constructor(
    @repository(DepartmentRepository) protected departmentRepository: DepartmentRepository,
  ) { }

  @get('/departments/{id}/titles', {
    responses: {
      '200': {
        description: 'Array of Department has many Title',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Title)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Title>,
  ): Promise<Title[]> {
    return this.departmentRepository.titles(id).find(filter);
  }

  @post('/departments/{id}/titles', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: {'application/json': {schema: getModelSchemaRef(Title)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Department.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Title, {
            title: 'NewTitleInDepartment',
            exclude: ['id'],
            optional: ['departmentId']
          }),
        },
      },
    }) title: Omit<Title, 'id'>,
  ): Promise<Title> {
    return this.departmentRepository.titles(id).create(title);
  }

  @patch('/departments/{id}/titles', {
    responses: {
      '200': {
        description: 'Department.Title PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Title, {partial: true}),
        },
      },
    })
    title: Partial<Title>,
    @param.query.object('where', getWhereSchemaFor(Title)) where?: Where<Title>,
  ): Promise<Count> {
    return this.departmentRepository.titles(id).patch(title, where);
  }

  @del('/departments/{id}/titles', {
    responses: {
      '200': {
        description: 'Department.Title DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Title)) where?: Where<Title>,
  ): Promise<Count> {
    return this.departmentRepository.titles(id).delete(where);
  }
}
