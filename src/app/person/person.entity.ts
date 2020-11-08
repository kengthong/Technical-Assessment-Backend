import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaritalStatus } from '../../config/enum';
import { HouseholdEntity } from '../household/household.entity';

@Entity('person')
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid')
  personId: string;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'gender', type: 'text' })
  gender: string;

  @Column({
    name: 'maritalStatus',
    type: 'enum',
    enum: MaritalStatus,
    default: MaritalStatus.SINGLE,
  })
  type: MaritalStatus;

  @Column({ name: 'spouse', type: 'text' })
  spouse: string;

  @Column({ name: 'occupationType', type: 'text' })
  occupationType: string;

  @Column({ name: 'annualIncome', type: 'numeric' })
  annualIncome: number;

  @Column({ name: 'dob', type: 'text' })
  dob: string;

  @ManyToOne(() => HouseholdEntity, (household) => household.members)
  household: HouseholdEntity;
}
