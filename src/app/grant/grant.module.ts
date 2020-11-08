import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantEntity } from './grant.entity';
import { GrantRepository } from './grant.repository';
import { GrantService } from './grant.service';

@Module({
  imports: [TypeOrmModule.forFeature([GrantEntity, GrantRepository])],
  providers: [GrantService],
  exports: [GrantService],
})
export class GrantModule {}
