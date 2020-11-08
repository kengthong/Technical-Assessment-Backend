import { Injectable } from '@nestjs/common';

import { Transactional } from 'typeorm-transactional-cls-hooked';
import { GrantRepository } from './grant.repository';
import { GrantEntity } from './grant.entity';

@Injectable()
export class GrantService {
  constructor(private grantRepository: GrantRepository) {}

  @Transactional()
  async createOne(grant: GrantEntity): Promise<GrantEntity> {
    return await this.grantRepository.save(grant);
  }

  async findOne(grantId: string): Promise<GrantEntity> {
    const grantEntityEntity = await this.grantRepository.findOne(grantId);
    if (!grantEntityEntity) {
      throw new Error(`Person with grantId ${grantId} not found`);
    }
    return grantEntityEntity;
  }
}
