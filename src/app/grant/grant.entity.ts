import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grant')
export class GrantEntity {
  @PrimaryGeneratedColumn('uuid')
  grantId?: string;

  @Column({ name: 'name', type: 'text', nullable: false })
  name: string;

  @Column({ name: 'lessThanAge', type: 'numeric', nullable: true })
  lessThanAge: number;

  @Column({ name: 'lessThanIncome', type: 'numeric', nullable: true })
  lessThanIncome: number;

  @Column({ name: 'isMarried', type: 'boolean', default: false, nullable: true })
  isMarried: boolean;

  @Column({ name: 'moreThanAge', type: 'numeric', nullable: true })
  moreThanAge: number;
}
