import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PersonEntity } from './person.entity';

@EntityRepository(PersonEntity)
export class PersonRepository extends BaseRepository<PersonEntity> {}
