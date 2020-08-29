// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  param,
  post,
  Request,
  requestBody,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import {Department} from '../models';
import {DepartmentRepository} from '../repositories';

const DEPARTMENT_RESPONSE: ResponseObject = {
  description: 'Department Response',
};

export class DepartmentController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,

    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
  ) {}

  @post('/department')
  async createDepartment(@requestBody() department: Department) {
    return this.departmentRepository.create(department);
  }

  @get('/department/{id}', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Department, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findDepartmentById(
    @param.path.number('id') id: number,
    @param.query.object(
      'filter',
      getFilterSchemaFor(Department, {exclude: 'where'}),
    )
    filter?: FilterExcludingWhere<Department>,
  ): Promise<Department> {
    // data retrieving logic goes here
    return this.departmentRepository.findById(id, filter);
  }

  // Map to `GET /ping`
  @get('/department', {
    responses: {
      '200': DEPARTMENT_RESPONSE,
    },
  })
  department(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from Department Controller',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
