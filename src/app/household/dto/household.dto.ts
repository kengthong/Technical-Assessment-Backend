import { HouseholdTypeEnum } from '../../../config/enum';
import { IsEnum } from 'class-validator';
import { HouseholdEntity } from '../household.entity';
import { PersonEntity } from '../../person/person.entity';
import { PersonDto, PersonMapper } from '../../person/dto/person.dto';

export class HouseholdDto {
  householdId?: string;

  @IsEnum(HouseholdTypeEnum)
// @ApiProperty({
//   description: 'description of the severity property',
//   enum: Severity
// })
  type?: HouseholdTypeEnum;
  address?: string;

  members?: PersonDto[];
  // @Field(() => Int)
  // type?: number;
}

export class HouseholdMapper {
  static toDto(entity: HouseholdEntity): HouseholdDto {
      let dto = new HouseholdDto();
      dto.address = entity.address;
      dto.type = entity.type;
      dto.householdId = entity.householdId;
      dto.members = entity.members && entity.members.map( p => PersonMapper.toDto(p)) || [];
      return dto;
  }

  static toEntity(dto: HouseholdDto): HouseholdEntity {
    let entity = new HouseholdEntity();
    entity.address = dto.address;
    entity.type = dto.type;
    entity.householdId = dto.householdId;
    return entity;
  }
}