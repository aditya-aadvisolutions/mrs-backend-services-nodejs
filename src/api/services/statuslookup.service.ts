import { QueryTypes } from "sequelize";
import MrsDatabase from "../../infra/database/mrs_db_connection";

export class StatusLookupService {
    async getStatus(type: string) {
        try {
            const sqlQuery = `EXEC USP_GETLOOKUPDATA @Type = :Type`;
            const replacements = { Type: type };

            const result = await MrsDatabase.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.RAW,

            });
            const lookups = result[0].map((record: any) => ({
                id: record.Id.toString(),
                value: record.Value.toString(),
            }));

            return lookups;
        } catch (error) {
            throw error;
        }
    }
}

export default new StatusLookupService