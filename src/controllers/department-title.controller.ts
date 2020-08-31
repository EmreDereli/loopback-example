import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Title} from '../models';
import {DepartmentRepository} from '../repositories';

export class DepartmentTitleController {
  constructor(
    @repository(DepartmentRepository)
    protected departmentRepository: DepartmentRepository,
  ) {}

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
  async find(@param.path.number('id') id: number): Promise<Title[]> {
    return this.departmentRepository.titles(id).find();
  }
}
