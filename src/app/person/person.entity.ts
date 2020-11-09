import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum, MaritalStatusEnum, OccupationTypeEnum } from '../../config/enum';
import { HouseholdEntity } from '../household/household.entity';

@Entity('person')
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid')
  personId: string;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({name: 'nric', type: 'text', unique: true})
  nric: string;

  @Column({
    name: 'gender',
    type: 'text',
    enum: GenderEnum,
    default: GenderEnum.NULL
  })
  gender: GenderEnum;

  @Column({
    name: 'maritalStatus',
    type: 'text',
    enum: MaritalStatusEnum,
    default: MaritalStatusEnum.SINGLE
  })
  maritalStatus: MaritalStatusEnum;

  @Column({ name: 'spouse', type: 'text' })
  spouse: string;

  @Column({
    name: 'occupationType',
    type: 'text',
    enum: OccupationTypeEnum,
    default: OccupationTypeEnum.UNEMPLOYED
  })
  occupationType: OccupationTypeEnum;

  @Column({ name: 'annualIncome', type: 'numeric' })
  annualIncome: number;

  @Column({ name: 'dob', type: 'text' })
  dob: string;

  @ManyToOne(() => HouseholdEntity,
      household => household.members,
    { cascade: ['insert', 'update'], eager: false })
  household: HouseholdEntity;
}
