import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Manager} from '../models';
import {ManagerRepository} from '../repositories';

export class ManagerController {
  constructor(
    @repository(ManagerRepository)
    public managerRepository : ManagerRepository,
  ) {}

  @post('/managers', {
    responses: {
      '200': {
        description: 'Manager model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manager)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manager, {
            title: 'NewManager',
            
          }),
        },
      },
    })
    manager: Manager,
  ): Promise<Manager> {
    return this.managerRepository.create(manager);
  }

  @get('/managers/count', {
    responses: {
      '200': {
        description: 'Manager model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Manager) where?: Where<Manager>,
  ): Promise<Count> {
    return this.managerRepository.count(where);
  }

  @get('/managers', {
    responses: {
      '200': {
        description: 'Array of Manager model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Manager, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Manager) filter?: Filter<Manager>,
  ): Promise<Manager[]> {
    return this.managerRepository.find(filter);
  }

  @patch('/managers', {
    responses: {
      '200': {
        description: 'Manager PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manager, {partial: true}),
        },
      },
    })
    manager: Manager,
    @param.where(Manager) where?: Where<Manager>,
  ): Promise<Count> {
    return this.managerRepository.updateAll(manager, where);
  }

  @get('/managers/{id}', {
    responses: {
      '200': {
        description: 'Manager model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Manager, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Manager, {exclude: 'where'}) filter?: FilterExcludingWhere<Manager>
  ): Promise<Manager> {
    return this.managerRepository.findById(id, filter);
  }

  @patch('/managers/{id}', {
    responses: {
      '204': {
        description: 'Manager PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manager, {partial: true}),
        },
      },
    })
    manager: Manager,
  ): Promise<void> {
    await this.managerRepository.updateById(id, manager);
  }

  @put('/managers/{id}', {
    responses: {
      '204': {
        description: 'Manager PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() manager: Manager,
  ): Promise<void> {
    await this.managerRepository.replaceById(id, manager);
  }

  @del('/managers/{id}', {
    responses: {
      '204': {
        description: 'Manager DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.managerRepository.deleteById(id);
  }
}
