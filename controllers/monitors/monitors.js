const { getAllMonitors, createMonitor, deleteMonitor, getSingleMonitor, updateMonitor } = require("../../models/monitorModel");

// Get all monitors
async function fetchMonitors(req, res){
    try{
        const user = req.user;

    const monitors = await getAllMonitors(user.id);

    res.status(200).json({
        monitors
    });

    }catch(e){
        res.status(500).json({
            message: "Internal server Error"
        })
 console.error(`Error fetching monitors ${e.message}`);
    }
}

// Save monitor
async function saveMonitor(req, res){
 try{
        const user = req.user;
        const { name, url } = req.body;

        if(!name || !url ){
            res.status(400).json({
                message: "Required fields missing"
            });
            return;
        }

        await createMonitor(user.id, name, url);

        res.status(201).json({
            message: "Monitor created successfully"
        });
        
 }catch(e){
        res.status(500).json({
            message: "Internal server Error"
        })
 console.error(`Error saving monitors ${e.message}`);
    } 
}

// Get single monitor
async function getMonitorById(req, res) {
    try{
        const id = req.params.id;
        const monitor = await getSingleMonitor(id);

        if(!monitor){
            res.status(404).json({
                message: "Monitor not found"
            });
            return;
        }
        if(monitor.user_id !== req.user.id){
            res.status(403).json({
                message: "Forbidden"
            });
            return;
        }

        res.status(200).json({
            monitor
        });
        
 }catch(e){
        res.status(500).json({
            message: "Internal server Error"
        })
 console.error(`Error getting single monitor ${e.message}`);
    }   
}

async function editMonitor(req, res) {
    try {
        const id = req.params.id;
        const monitor = await getSingleMonitor(id);

        if (!monitor) {
            return res.status(404).json({
                message: "Monitor not found"
            });
        }
        
        if (monitor.user_id !== req.user.id) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        const { name, url } = req.body;

        if (!name && !url) {
            return res.status(400).json({
                message: "At least one field (name or url) must be provided for update"
            });
        }

        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (url !== undefined) updateFields.url = url;

        await updateMonitor(id, updateFields);        

        return res.status(200).json({
            message: "Monitor has been successfully updated"
        });
    
    } catch (e) {
        console.error(`Error editing monitor: ${e.message}`);
        return res.status(500).json({
            message: "Internal server Error"
        });
    }   
}

// Delete Monitor
async function removeMonitor(req, res){
     try{
    const id = req.params.id;
     const monitor = await getSingleMonitor(id);

        if(!monitor){
            res.status(404).json({
                message: "Monitor not found"
            });
            return;
        }

        if(monitor.user_id !== req.user.id){
            res.status(403).json({
                message: "Forbidden"
            });
            return;
        }
            await deleteMonitor(id);

            res.status(200).json({
                message: "Monitor has been successfully deleted"
            });
    
 }catch(e){
        res.status(500).json({
            message: "Internal server Error"
        });
        
 console.error(`Error deleting monitor ${e.message}`);
    }   
}

module.exports = {
    fetchMonitors,
    saveMonitor,
    editMonitor,
    removeMonitor,
    getMonitorById
}
