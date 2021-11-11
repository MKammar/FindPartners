module.exports = app => {
    var router = require("express").Router();

    const partnersController = require("../controller/PartnerController.js");

    router.get('/listPartners/:Ldistance/:Hdistance', partnersController.GetPartnersFiltered);

    app.use('/', router);
}