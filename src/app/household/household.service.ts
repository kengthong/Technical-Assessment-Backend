import { Injectable } from '@nestjs/common';

import { Transactional } from 'typeorm-transactional-cls-hooked';
import { HouseholdRepository } from './household.repository';
import { HouseholdEntity } from './household.entity';
import { HouseholdDto, HouseholdMapper } from './dto/household.dto';
import { PersonDto } from '../person/dto/person.dto';
import { PersonService } from '../person/person.service';

@Injectable()
export class HouseholdService {
  constructor(
    private householdRepository: HouseholdRepository,
    private personService: PersonService
  ) {}

  @Transactional()
  async createOne(household: HouseholdDto): Promise<HouseholdDto> {
    const householdE = await this.householdRepository.save(HouseholdMapper.toEntity(household));
    return HouseholdMapper.toDto(householdE);
  }

  async addFamMember(newFamMember: PersonDto, householdId: string): Promise<HouseholdDto> {
    let personEntity;

    let householdEntity = await this.findOne(householdId);
    const personEntities = await this.personService.find({nric: newFamMember.nric});
    if(personEntities.length === 0) {
      personEntity = await this.personService.createOne(newFamMember);
    } else if(personEntities.length ===1) {
      personEntity = personEntities[0]
    } else {
      throw new Error("Error adding family member, please contact the relevant authority.");
    }

    householdEntity.members.push(personEntity);
    personEntity.household = householdEntity;

    await this.personService.save(personEntity);
    await this.householdRepository.save(householdEntity)
    return HouseholdMapper.toDto(householdEntity);
  }

  async findOne(householdId: string): Promise<HouseholdEntity> {
    const householdEntityEntity = await this.householdRepository.findOne(householdId);
    if (!householdEntityEntity) {
      throw new Error(`Person with householdId ${householdId} not found`);
    }
    return householdEntityEntity;
  }
}
