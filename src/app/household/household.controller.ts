import { Body, Controller, Get, Post } from '@nestjs/common';
import { HouseholdService } from './household.service';
import { HouseholdDto } from './dto/household.dto';
import { PersonDto } from '../person/dto/person.dto';
import { HouseholdEntity } from './household.entity';

@Controller('household')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  @Post()
  async createHousehold(@Body() newHousehold: HouseholdDto): Promise<HouseholdDto> {
    console.log('newhosuehold = ', newHousehold);
    return await this.householdService.createOne(newHousehold);
  }

  @Post('add-member')
  async addFamMember(@Body() body: {
    newFamMember: PersonDto,
    householdId: string
  }): Promise<HouseholdDto>{
    console.log('newFam Member =', body.newFamMember)
    return await this.householdService.addFamMember(body.newFamMember, body.householdId);
  }

  @Get()
  async getAllHouseholds() {
    // return await this.householdService.find();
  }

  @Get()
  test() {
    return "test";
  }
}
