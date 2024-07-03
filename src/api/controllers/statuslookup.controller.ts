import statuslookupService from "../services/statuslookup.service";

export const StatusLookupController = async (req, res) => {
    const { type } = req.query;
    try {
        const lookups = await statuslookupService.getStatus(type);
        res.status(200).json({
            data: lookups,
            isSuccess: true
        });
    }
    catch (error) {
        res.status(500).json({
            data: null,
            isSuccess: false,
            message: error.message
        });
    }
}