import { Controller, Get } from '@nestjs/common';
import { HouseholdService } from './household.service';

@Controller()
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  @Get()
  getHello(): void {
    // return this.householdService.getHello();
  }
}
