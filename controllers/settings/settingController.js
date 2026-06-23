
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
    deleteAccount
}