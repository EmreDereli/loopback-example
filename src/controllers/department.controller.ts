// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {
  get,
  param,
  post,
  Request,
  requestBody,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import {Department} from '../models';

const DEPARTMENT_RESPONSE: ResponseObject = {
  description: 'Department Response',
};

export class DepartmentController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @post('/department')
  async createDepartment(@requestBody() department: Department) {}

  @get('/department/{id}')
  async findDepartmentById(
    @param.path.number('id') id: number,
    @param.query.boolean('items') items?: boolean,
  ): Promise<Department> {
    // data retrieving logic goes here
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
