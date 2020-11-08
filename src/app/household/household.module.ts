import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseholdController } from './household.controller';
import { HouseholdService } from './household.service';
import { HouseholdEntity } from './household.entity';
import { HouseholdRepository } from './household.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HouseholdEntity, HouseholdRepository])],
  controllers: [HouseholdController],
  providers: [HouseholdService],
  exports: [HouseholdService],
})
export class HouseholdModule {}
