import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

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

    let householdEntity = await this.householdRepository.findOne(householdId);
    if(!householdEntity) {
      throw new NotFoundException('Household not found');
    }
    const personEntities = await this.personService.find({nric: newFamMember.nric});
    if(personEntities.length === 0) {
      newFamMember.dob =new Date(newFamMember.dob);
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

  async findOne(householdId: string): Promise<HouseholdDto> {
    const householdEntityEntity = await this.householdRepository.findOne(householdId);
    if (!householdEntityEntity) {
      throw new NotFoundException(`Household with householdId ${householdId} not found`);
    }
    return householdEntityEntity;
  }

  async findAll(): Promise<HouseholdDto[]> {
    const householdEntities = await this.householdRepository.find();
    return householdEntities.map( h => HouseholdMapper.toDto(h));
  }

  async findQualifyingHousehold(isMarried?: string, moreThanSize?: number, lessThanIncome?: number, lessThanAge?: number, moreThanAge?: number): Promise<HouseholdDto[]> {
    const rawResults = await this.householdRepository.findQualifyingHousehold(isMarried, moreThanSize, lessThanIncome, lessThanAge, moreThanAge)

    // Generate an array of HouseholdDtos with members
    const results = rawResults.reduce((r,s) => {
      let p = new PersonDto();
      p.dob = s.dob;
      p.nric = s.nric;
      p.annualIncome = s.annualIncome;
      p.gender = s.gender;
      p.maritalStatus = s.maritalStatus;
      p.occupationType = s.occupationType;
      p.personId = s.personid;
      p.spouse = s.spouse;
      // if household is created
      if(r[s.householdId]) {
        r[s.householdId].members.push(p);
      } else { // else make new household
        r[s.householdId] = new HouseholdDto();
        r[s.householdId].type = s.type;
        r[s.householdId].address = s.address;
        r[s.householdId].members = [p];
      }
      return r;
    },{});

    return Object.values(results);
  }

  async deleteHousehold(householdId: string) {
    const householdEntity = await this.householdRepository.findOne(householdId);
    if(householdEntity) {
      householdEntity.members.forEach( p => {
        this.personService.remove(p)
      })
      await this.householdRepository.remove(householdEntity);
    } else {
      throw new NotFoundException('No such household')
    }
  }

  async removePersonFromHousehold(householdId: string, personId: string) {
    let householdEntity = await this.householdRepository.findOne(householdId);
    if(householdEntity) {
      if(!householdEntity.members) throw new BadRequestException('Invalid request');
      householdEntity.members.forEach( p => {
        if(p.personId === personId) {
          this.personService.remove(p)
        }
      });
      householdEntity.members = householdEntity.members.filter( p => p.personId !== personId);
      await this.householdRepository.save(householdEntity);
    } else {
      throw new NotFoundException('No such household')
    }
  }
}
