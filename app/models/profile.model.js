const sql = require("./db.js");

// constructor
const Profile = function (customer) {
  this.uid = customer.uid;
  this.Contact_name = customer.Contact_name;
  this.Bus_name = customer.Bus_name;
  this.Bus_Addr1 = customer.Bus_Addr1;
  this.Bus_Addr2 = customer.Bus_Addr2;
  this.Bus_State = customer.Bus_State;
  this.Bus_cntry = customer.Bus_cntry;
  this.Bus_city_nm = customer.Bus_city_nm;
  this.Bus_Zip = customer.Bus_Zip;
  this.Bus_phone = customer.Bus_phone;
  this.Aadhar_card = customer.Aadhar_card;
  this.PAN_NO = customer.PAN_NO;
  this.GST_NO = customer.GST_NO;
  this.TIN_NO = customer.TIN_NO;
  this.created_dt = customer.created_dt;
  this.last_updated_dt = customer.last_updated_dt;
};

const userValid = function (uid, result) {
  sql.query(`SELECT * FROM cust_profile WHERE uid = '${uid}'`, (err, res) => {
    if (res.length) {
      result(false);
      return;
    }
    result(true);
    return;
  });
};

Profile.create = async (newCustomer, result) => {
  userValid(newCustomer.uid, (res) => {
    if (!res) {
      result({ message: "this user profile data is already existed!" }, null);
      return;
    }
    sql.query("INSERT INTO cust_profile SET ?", newCustomer, (err, res) => {
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

Profile.findById = (customerId, result) => {
  sql.query(
    `SELECT * FROM cust_profile WHERE uid = '${customerId}'`,
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

      // not found Profile with the uid
      result({ kind: "not_found" }, null);
    }
  );
};

Profile.updateById = (id, profile, result) => {
  sql.query(
    "UPDATE cust_profile SET Contact_name = ?, Bus_name = ?, Bus_Addr1 = ?, Bus_Addr2 = ?, Bus_State = ?, Bus_cntry = ?, Bus_city_nm = ?, Bus_Zip = ?, Bus_phone = ?, Aadhar_card = ?, PAN_NO = ?, GST_NO = ?, TIN_NO = ?, last_updated_dt = ?  WHERE uid = ?",
    [
      profile.Contact_name,
      profile.Bus_name,
      profile.Bus_Addr1,
      profile.Bus_Addr2,
      profile.Bus_State,
      profile.Bus_cntry,
      profile.Bus_city_nm,
      profile.Bus_Zip,
      profile.Bus_phone,
      profile.Aadhar_card,
      profile.PAN_NO,
      profile.GST_NO,
      profile.TIN_NO,
      new Date(),
      id,
    ],
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

      console.log("updated profile: ", { id: id, ...profile });
      result(null, { id: id, ...profile });
    }
  );
};

module.exports = Profile;
