import { Injectable } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { PersonEntity } from './person.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { PersonDto } from './dto/person.dto';

@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  @Transactional()
  async createOne(personDto: PersonDto): Promise<PersonEntity> {
    return await this.personRepository.save(personDto);
  }

  async findOne(personId: string): Promise<PersonEntity> {
    const personEntity = await this.personRepository.findOne(personId);
    if (!personEntity) {
      throw new Error(`Person with personId ${personId} not found`);
    }
    return personEntity;
  }

  async find(params: any): Promise<PersonEntity[]> {
    return await this.personRepository.find({
      ...params
    })
  }

  async save(personEntity: PersonEntity): Promise<PersonEntity>{
    return await this.personRepository.save(personEntity);
  }

  async remove(personEntity: PersonEntity): Promise<PersonEntity> {
    return await this.personRepository.remove(personEntity);
  }
}
