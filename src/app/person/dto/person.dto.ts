import { GenderEnum, MaritalStatusEnum, OccupationTypeEnum } from '../../../config/enum';
import { IsEnum } from 'class-validator';
import { PersonEntity } from '../person.entity';

export class PersonDto {
    personId?: string;
    name?: string;

    spouse?: string;

    annualIncome?: number;
    dob?: string;
    nric?: string;

    @IsEnum(OccupationTypeEnum)
    occupationType?: OccupationTypeEnum;
    @IsEnum(GenderEnum)
    gender?: GenderEnum;
    @IsEnum(MaritalStatusEnum)
    maritalStatus?: MaritalStatusEnum;
}

export class PersonMapper {
  static toDto(entity: PersonEntity): PersonDto {
    let dto = new PersonDto();
    dto.personId = entity.personId;
    dto.name = entity.name;
    dto.gender = entity.gender;
    dto.spouse = entity.spouse;
    dto.occupationType = entity.occupationType;
    dto.annualIncome = entity.annualIncome;
    dto.dob = entity.dob;
    dto.nric = entity.nric;
    dto.maritalStatus = entity.maritalStatus;

    return dto;
  }

  static toEntity(dto: PersonDto): PersonEntity {
    let entity = new PersonEntity();
    entity.personId = dto.personId;
    entity.name = dto.name;
    entity.gender = dto.gender;
    entity.spouse = dto.spouse;
    entity.occupationType = dto.occupationType;
    entity.annualIncome = dto.annualIncome;
    entity.dob = dto.dob;
    entity.nric = dto.nric;
    entity.maritalStatus = dto.maritalStatus;
    return entity;
  }
}