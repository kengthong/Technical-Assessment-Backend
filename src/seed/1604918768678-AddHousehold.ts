import {MigrationInterface, QueryRunner} from "typeorm";
import { HouseholdEntity } from '../app/household/household.entity';
import { HouseholdTypeEnum } from '../config/enum';

export class AddHousehold1604918768678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const productRepo = queryRunner.connection.getRepository("household");
        // await queryRunner.query(`INSERT INTO household ("householdId", "type", "address") VALUES (?, ?, ?) — PARAMETERS: ["6acd5cd8-a3c7-4af9-91f0-a013b03fd678",”HDB", "Block 805 Yishun Ring Road #11-4275"]`);
        await productRepo.insert([
            {
                householdId: "6acd5cd8-a3c7-4af9-91f0-a013b03fd678",
                type: HouseholdTypeEnum.HDB,
                address: 'Block 805 Yishun Ring Road #11-4274'
            }
        ])

        const grantRepo = queryRunner.connection.getRepository("grant");
        await grantRepo.insert([
            {
                // householdId: "6acd5cd8-a3c7-4af9-91f0-a013b03fd678",
                name: "Student Encouragement Bonus",
                lessThanAge: 16,
                lessThanIncome: 150000
            },
            {
                // householdId: "6acd5cd8-a3c7-4af9-91f0-a013b03fd678",
                name: "Family Togetherness Scheme",
                lessThanAge: 18,
                isMarried: true
            },
            {
                // householdId: "6acd5cd8-a3c7-4af9-91f0-a013b03fd678",
                name: "Elder Bonus",
                moreThanAge: 50,
                // lessThanIncome: 150000
            },
            // {
            //     // householdId: "6acd5cd8-a3c7-4af9-91f0-a013b03fd678",
            //     name: "Student Encouragement Bonus",
            //     lessThanAge: 16,
            //     lessThanIncome: 150000
            // },
            // {
            //     // householdId: "6acd5cd8-a3c7-4af9-91f0-a013b03fd678",
            //     name: "Student Encouragement Bonus",
            //     lessThanAge: 16,
            //     lessThanIncome: 150000
            // }
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
