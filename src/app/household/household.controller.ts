import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { HouseholdService } from './household.service';
import { HouseholdDto } from './dto/household.dto';
import { PersonDto } from '../person/dto/person.dto';
import { HouseholdEntity } from './household.entity';

@Controller('household')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  @Post()
  async createHousehold(@Body() newHousehold: HouseholdDto): Promise<HouseholdDto> {
    return await this.householdService.createOne(newHousehold);
  }

  @Post('add-member')
  async addFamMember(@Body() body: {
    newFamMember: PersonDto,
    householdId: string
  }): Promise<HouseholdDto>{
    return await this.householdService.addFamMember(body.newFamMember, body.householdId).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })
  }

  @Get()
  async getAllHouseholds() {
    return await this.householdService.findAll();
  }

  @Get('id')
  async getHouseholdById(@Query('householdId') householdId: string) {
    return await this.householdService.findOne(householdId).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.NOT_FOUND);
    })
  }

  @Get('grant')
  async getHouseholdByGrantId(
    @Query('isMarried') isMarried?: string,
    @Query('moreThanSize') moreThanSize?: number,
    @Query('lessThanIncome') lessThanIncome?: number,
    @Query('lessThanAge') lessThanAge?: number,
    @Query('moreThanAge') moreThanAge?: number
  ) {

    return await this.householdService.findQualifyingHousehold(isMarried, moreThanSize, lessThanIncome, lessThanAge, moreThanAge);
  }

  @Delete('id')
  async deleteHouseById(@Query('householdId') householdId: string) {
      return await this.householdService.deleteHousehold(householdId).catch( err => {
        throw new HttpException({
          message: err.message
        }, HttpStatus.BAD_REQUEST);
      })
  }

  @Delete('person')
  async deletePersonFromHousehold(
    @Query('householdId') householdId: string,
    @Query('personId') personId: string
    ) {
    return await this.householdService.removePersonFromHousehold(householdId, personId).catch( err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })
  }
}
