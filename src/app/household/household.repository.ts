import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { HouseholdEntity } from './household.entity';

@EntityRepository(HouseholdEntity)
export class HouseholdRepository extends BaseRepository<HouseholdEntity> {
  async findQualifyingHousehold(isMarried?: string, moreThanSize?: number, lessThanIncome?: number, lessThanAge?: number, moreThanAge?: number) {
    let results =  await this.query(`
    select h."householdId", h.type as type, h.address as address, p1."personId" as personId, 
      p1.name, p1.nric, p1.gender, p1."maritalStatus", p1."occupationType", p1."annualIncome", p1.dob, p1.spouse
    from household h, person p1 inner join (
      SELECT p."householdHouseholdId", sum("annualIncome") as totalIncome, count(p) as paxsize
      FROM  person p  
      group by p."householdHouseholdId"
    ) as p2
    on p1."householdHouseholdId" = p2."householdHouseholdId"
    where (p2.totalIncome < $2 OR $2 is NULL)
    and h."householdId" = p1."householdHouseholdId"
    and (extract (year FROM age(current_date,p1.dob)) <$3 OR $3 is NULL)
    and (extract (year FROM age(current_date,p1.dob)) >$4 OR $4 is NULL)
    and (p2.paxSize > $1 OR $1 is NULL);`, [moreThanSize, lessThanIncome, lessThanAge, moreThanAge]);


    // if married
    if(isMarried != null && isMarried === 'true') {
      let marriedHousehold = {};
      let marriedHouseholdIds = [];

      // Get member size of each household
      results.forEach( r => {
        if(r.maritalStatus === "MARRIED") {
          marriedHousehold[r.householdId] = marriedHousehold[r.householdId]? marriedHousehold[r.householdId]+1 : 1;
        }
      })

      // push id into list if family size >= 2
      for(let hId in marriedHousehold) {
        if(marriedHousehold[hId] >= 2) {
          marriedHouseholdIds.push(hId);
        }
      }
      return results.filter( r => marriedHouseholdIds.includes(r.householdId));
    } else {

      return results;
    }



  }
}