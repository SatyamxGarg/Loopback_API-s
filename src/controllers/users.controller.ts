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
  response,
} from '@loopback/rest';
import {EmUser} from '../models';
import {EmUserRepository} from '../repositories';

export class UsersController {
  constructor(
    @repository(EmUserRepository)
    public emUserRepository : EmUserRepository,
  ) {}

  @post('/em-users')
  @response(200, {
    description: 'EmUser model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmUser)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmUser, {
            title: 'NewEmUser',
            exclude: ['userId'],
          }),
        },
      },
    })
    emUser: Omit<EmUser, 'userId'>,
  ): Promise<EmUser> {
    return this.emUserRepository.create(emUser);
  }

  @get('/em-users/count')
  @response(200, {
    description: 'EmUser model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmUser) where?: Where<EmUser>,
  ): Promise<Count> {
    return this.emUserRepository.count(where);
  }

  @get('/em-users')
  @response(200, {
    description: 'Array of EmUser model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmUser, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmUser) filter?: Filter<EmUser>,
  ): Promise<EmUser[]> {
    return this.emUserRepository.find(filter);
  }

  @patch('/em-users')
  @response(200, {
    description: 'EmUser PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmUser, {partial: true}),
        },
      },
    })
    emUser: EmUser,
    @param.where(EmUser) where?: Where<EmUser>,
  ): Promise<Count> {
    return this.emUserRepository.updateAll(emUser, where);
  }

  @get('/em-users/{id}')
  @response(200, {
    description: 'EmUser model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmUser, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EmUser, {exclude: 'where'}) filter?: FilterExcludingWhere<EmUser>
  ): Promise<EmUser> {
    return this.emUserRepository.findById(id, filter);
  }

  @patch('/em-users/{id}')
  @response(204, {
    description: 'EmUser PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmUser, {partial: true}),
        },
      },
    })
    emUser: EmUser,
  ): Promise<void> {
    await this.emUserRepository.updateById(id, emUser);
  }

  @put('/em-users/{id}')
  @response(204, {
    description: 'EmUser PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() emUser: EmUser,
  ): Promise<void> {
    await this.emUserRepository.replaceById(id, emUser);
  }

  @del('/em-users/{id}')
  @response(204, {
    description: 'EmUser DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.emUserRepository.deleteById(id);
  }
}
