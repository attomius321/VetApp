module.exports = app => {
    const appointments = require("../controllers/appointment.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", appointments.create);
  
    router.get("/", appointments.findAll);
    
    router.get("/:id", appointments.findOne);
  
    router.put("/:id", appointments.update);
  
    router.delete("/:id", appointments.delete);
  
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/appointments', router);
  };