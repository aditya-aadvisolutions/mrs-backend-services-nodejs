import { JobModal } from "../models/saveJob";
import { Request, Response } from 'express';
import SaveJobService from "../services/saveJob.service";
import MrsConfig from "../configuration/mrs_config";
import MrsDatabase from "../../infra/database/mrs_db_connection";

export class SaveJobController {
    private saveJobService: SaveJobService;
    constructor() {
        this.saveJobService = new SaveJobService(MrsDatabase);
    }

    SaveJob = async (req: Request, res: Response): Promise<void> => {
        try {
            const job: JobModal = req.body;
            const isSuccess = await this.saveJobService.saveJob(job);

            if (isSuccess) {
                res.status(200).json({ isSuccess: true });
            } else {
                res.status(400).json({ isSuccess: false, message: 'Failed to save job.' });
            }
        } catch (error) {
            res.status(500).json({ isSuccess: false, message: error.message });
        }
    }

}
