import { JobModal } from "../models/saveJob";
import { Request, Response } from 'express';
import saveJobService from "../services/saveJob.service";


export const SaveJobController = async (req: Request, res: Response): Promise<void> => {

    try {
        const job: JobModal = req.body;
        const isSuccess = await saveJobService.saveJob(job);

        if (isSuccess) {
            res.status(200).json({ isSuccess: true });
        } else {
            res.status(400).json({ isSuccess: false, message: 'Failed to save job.' });
        }
    } catch (error) {
        res.status(500).json({ isSuccess: false, message: error.message });
    }
}


