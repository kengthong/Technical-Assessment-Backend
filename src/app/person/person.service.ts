import { Injectable } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { PersonEntity } from './person.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  @Transactional()
  async createOne(person: PersonEntity): Promise<PersonEntity> {
    return await this.personRepository.save(person);
  }

  async findOne(personId: string): Promise<PersonEntity> {
    const personEntity = await this.personRepository.findOne(personId);
    if (!personEntity) {
      throw new Error(`Person with personId ${personId} not found`);
    }
    return personEntity;
  }
}
