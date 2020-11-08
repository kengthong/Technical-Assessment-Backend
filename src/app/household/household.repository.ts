import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { HouseholdEntity } from './household.entity';

@EntityRepository(HouseholdEntity)
export class HouseholdRepository extends BaseRepository<HouseholdEntity> {}
