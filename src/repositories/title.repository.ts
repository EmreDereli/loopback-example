import {DefaultCrudRepository} from '@loopback/repository';
import {Title, TitleRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TitleRepository extends DefaultCrudRepository<
  Title,
  typeof Title.prototype.id,
  TitleRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Title, dataSource);
  }
}
