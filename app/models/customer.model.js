const sql = require("./db.js");

// constructor
const Customer = function (customer) {
  this.user_email = customer.user_email;
  this.user_name = customer.user_name;
  this.pwd = customer.pwd;
  this.uid = customer.uid;
  this.created_dt = customer.created_dt;
  this.last_login = customer.last_login;
};

const userValid = function (email, result) {
  sql.query(
    `SELECT * FROM cust_login WHERE user_email = '${email}'`,
    (err, res) => {
      if (res.length) {
        result(false);
        return;
      }
      result(true);
      return;
    }
  );
};

Customer.create = async (newCustomer, result) => {
  userValid(newCustomer.user_email, (res) => {
    if (!res) {
      result({ message: "this user is already existed!" }, null);
      return;
    }
    sql.query("INSERT INTO cust_login SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created customer: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(
    `SELECT * FROM cust_login WHERE uid = '${customerId}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Customer.getAll = (result) => {
  sql.query("SELECT * FROM cust_login", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE cust_login SET user_email = ?, user_name = ?, pwd = ? WHERE uid = ?",
    [customer.user_email, customer.user_name, customer.pwd, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};



module.exports = Customer;
