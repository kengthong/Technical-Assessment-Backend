import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HouseholdType } from '../../config/enum';
import { PersonEntity } from '../person/person.entity';

@Entity('household')
export class HouseholdEntity {
  @PrimaryGeneratedColumn('uuid')
  householdId?: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: HouseholdType,
    default: HouseholdType.HDB,
  })
  type: HouseholdType;

  @OneToMany(() => PersonEntity, (person) => person.household)
  members: PersonEntity[];
}
