import { Injectable } from '@nestjs/common';

import { Transactional } from 'typeorm-transactional-cls-hooked';
import { HouseholdRepository } from './household.repository';
import { HouseholdEntity } from './household.entity';

@Injectable()
export class HouseholdService {
  constructor(private householdRepository: HouseholdRepository) {}

  @Transactional()
  async createOne(household: HouseholdEntity): Promise<HouseholdEntity> {
    return await this.householdRepository.save(household);
  }

  async findOne(householdId: string): Promise<HouseholdEntity> {
    const householdEntityEntity = await this.householdRepository.findOne(householdId);
    if (!householdEntityEntity) {
      throw new Error(`Person with householdId ${householdId} not found`);
    }
    return householdEntityEntity;
  }
}
