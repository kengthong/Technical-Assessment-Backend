import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { GrantEntity } from './grant.entity';

@EntityRepository(GrantEntity)
export class GrantRepository extends BaseRepository<GrantEntity> {}