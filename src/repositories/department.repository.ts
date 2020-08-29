import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Department, DepartmentRelations, Employee, Title} from '../models';
import {EmployeeRepository} from './employee.repository';
import {TitleRepository} from './title.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof Department.prototype.id>;

  public readonly titles: HasManyRepositoryFactory<Title, typeof Department.prototype.id>;

  constructor(@inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('TitleRepository') protected titleRepositoryGetter: Getter<TitleRepository>,) {
    super(Department, dataSource);
    this.titles = this.createHasManyRepositoryFactoryFor('titles', titleRepositoryGetter,);
    this.registerInclusionResolver('titles', this.titles.inclusionResolver);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
