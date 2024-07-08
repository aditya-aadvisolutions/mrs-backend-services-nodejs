import userlookupService from "../services/userlookup.service";

export const UserLookupController = async (req, res) => {
    const { role } = req.query;
    try {
        const lookups = await userlookupService.getStatus(role);
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