const { getSettings, updateSettings, deleteAcct } = require("../../models/settingModel");

// Get settings
async function getUserSettings( req, res ){
    try {
        const { id } = req.user

        const settings = await getSettings(id);

        res.status(200).json({
            message: "Successfully fetched user settings",
            settings
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        console.error(`Error getting user settings ${error.message}`);
    }
}

// update setting
async function editSettings(req, res) {
    try {
        const { emailAlerts, interval } = req.body;

        if (emailAlerts === undefined && interval === undefined) {
            return res.status(400).json({
                error: "At least one field (emailAlerts or interval) must be provided for update"
            });
        }

        const updateFields = {};

        if (emailAlerts !== undefined) {
            if (typeof emailAlerts !== 'boolean') {
                return res.status(400).json({
                    error: "Invalid input. 'emailAlerts' must be a boolean."
                });
            }
            updateFields.emailAlerts = emailAlerts;
        }

        if (interval !== undefined) {
            const allowedIntervals = [3, 5, 10];
            if (!allowedIntervals.includes(interval)) {
                return res.status(400).json({
                    error: "Invalid input. 'interval' must be 3, 5, or 10."
                });
            }
            updateFields.interval = interval;
        }

        await updateSettings(req.user.id, updateFields);

        return res.status(200).json({
            message: "Settings updated successfully"
        });
    } catch (error) {
        console.error(`Error updating user settings: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Delete account
async function deleteAccount( req, res ){
    try {
        const { id } = req.user;

        await deleteAcct(id);

        res.status(200).json({
            message: "Account terminated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        console.error(`Error deleting account ${error.message}`);
    }
}

module.exports = {
    getUserSettings,
    editSettings,
    deleteAccount
}