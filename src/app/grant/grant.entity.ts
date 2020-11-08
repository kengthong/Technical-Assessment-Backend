import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grant')
export class GrantEntity {
  @PrimaryGeneratedColumn('uuid')
  grantId?: string;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'lessThanAge', type: 'numeric' })
  lessThanAge: number;

  @Column({ name: 'lessThanIncome', type: 'numeric' })
  lessThanIncome: number;

  @Column({ name: 'isMarried', type: 'boolean' })
  isMarried: boolean;

  @Column({ name: 'moreThanAge', type: 'numeric' })
  moreThanAge: number;
}
