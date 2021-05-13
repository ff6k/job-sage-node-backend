module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");
  const profiles = require("../controllers/profile.controller.js");

  // Create a new Customer
  app.post("/customers", customers.create);

  // Retrieve all Customers
  app.get("/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  //Create a new Profile
  app.post("/profiles", profiles.create);

  // Retrieve a single Customer with customerId
  app.get("/profiles/:customerId", profiles.findOne);

  // Update a Profile with customerId
  app.put("/profiles/:customerId", profiles.update);
};
