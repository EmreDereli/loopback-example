import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Manager, ManagerRelations, Employee} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmployeeRepository} from './employee.repository';

export class ManagerRepository extends DefaultCrudRepository<
  Manager,
  typeof Manager.prototype.id,
  ManagerRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof Manager.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Manager, dataSource);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
