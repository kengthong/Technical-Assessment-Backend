import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HouseholdTypeEnum } from '../../config/enum';
import { PersonEntity } from '../person/person.entity';

@Entity('household')
export class HouseholdEntity {
  @PrimaryGeneratedColumn('uuid')
  householdId?: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: HouseholdTypeEnum,
    default: HouseholdTypeEnum.HDB,
  })
  type: HouseholdTypeEnum;

  @Column({
    name: 'address',
    type: 'text',
    unique: true
  })
  address: string;



  @OneToMany(() => PersonEntity,
    (person) => person.household,
    { cascade: ['insert', 'update'], eager: true })
  members: PersonEntity[];
}
