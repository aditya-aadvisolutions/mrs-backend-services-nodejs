
import { MultipartService } from "../services/multipart.service";

export const MultipartController = async (req, res, next) => {
    try {
        console.log(req.body, "reqqqqq")
        const clients = await MultipartService.processUpload(req.body);
        res.status(200).json(clients)
    } catch (error) {
        next(error);
    }
}
