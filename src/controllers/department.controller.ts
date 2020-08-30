// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  param,
  post,
  put,
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

  @post('/department', {
    responses: {
      '200': {
        description: 'Department Create',
      },
    },
  })
  async createDepartment(@requestBody() department: Department) {
    return this.departmentRepository.create(department);
  }

  @get('/department/{id}', {
    responses: {
      '200': {
        description: 'Department by ID',
      },
    },
  })
  async findDepartmentById(
    @param.path.number('id') id: number,
  ): Promise<Department> {
    // data retrieving logic goes here
    return this.departmentRepository.findById(id);
  }

  @put('/department/{id}', {
    responses: {
      '200': {
        description: 'Department Update',
      },
    },
  })
  async updateDepartment(
    @param.path.number('id') id: number,
    @requestBody() department: Department,
  ) {
    await this.departmentRepository.replaceById(id, department);
    return this.departmentRepository.findById(id);
  }

  // Map to `GET /ping`
  @get('/department', {
    responses: {
      '200': {
        description: 'Array of all Departments',
      },
    },
  })
  async findAllDepartments() {
    const departments = await this.departmentRepository.find({
      fields: {id: true, name: true},
    });
    return {
      departments: departments,
      status: 200,
      description: 'All Departments',
    };
  }
}
