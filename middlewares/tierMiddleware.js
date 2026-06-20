const { countByUser } = require("../models/monitorModel");
const { getUserTier } = require("../models/userModel");

const LIMITS = {
    free: 3,
    tier_1: 10,
    tier_2: 20,
    tier_3: Infinity
};

module.exports = async (req, res, next) => {
    try {
        const { id } = req.user;

        const tier = await getUserTier(id);
        const userCount = await countByUser(id);

        const limit = LIMITS[tier];

        if (limit === undefined) {
            return res.status(400).json({
                message: "Invalid plan"
            });
        }

        if (userCount >= limit) {
            return res.status(403).json({
                message: "Exceeded Plan limits"
            });
        }

        next();
    } catch (error) {
        console.error(`Error checking tiers: ${error.message}`);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};