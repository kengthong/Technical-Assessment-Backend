import { Module } from '@nestjs/common';
import { HouseholdModule } from './app/household/household.module';
import { PersonModule } from './app/person/person.module';
import { DBProviderModule } from './config/database.config';
import { GrantModule } from './app/grant/grant.module';

@Module({
  imports: [
    HouseholdModule,
    PersonModule,
    GrantModule,
    DBProviderModule.forConnection()
  ],
})
export class AppModule {}
