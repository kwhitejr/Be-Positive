BloodType = {

  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {

  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 200,

  /**
   * returns BloodType, or false to give no BloodType
   *
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   *
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   *
   */

  receive_patient : function (blood_inventory, patient) {

    var reNEG = /NEG$/;

    if (patient.blood_type === BloodType.O_NEG) {
      return BloodType.O_NEG || false;
    }
    if (patient.blood_type === BloodType.O_POS) {
      return BloodType.O_POS || BloodType.O_NEG || false;
    }
    if (patient.blood_type === BloodType.A_NEG) {
      return BloodType.A_NEG || BloodType.O_NEG || false;
    }
    if (patient.blood_type === BloodType.B_NEG) {
      return BloodType.B_NEG || BloodType.O_NEG || false;
    }
    if (patient.blood_type === BloodType.A_POS) {
      var bloodArrAPos = ['A_POS', 'A_NEG', 'O_POS', 'O_NEG'];
      var greatestA = -1;
      var greatestTypeA;
      for (var i = 0; i < bloodArrAPos.length; i++) {
        if (blood_inventory[bloodArrAPos[i]] > greatestA) {
          greatestA = blood_inventory[bloodArrAPos[i]];
          greatestTypeA = bloodArrAPos[i];
        }
      }
      if (greatestA > 0) {
        return BloodType[greatestTypeA];
      } else {
        return false;
      }
    }
    if (patient.blood_type === BloodType.B_POS) {
      var bloodArrBPos = ['B_POS', 'B_NEG', 'O_POS', 'O_NEG'];
      var greatestB = -1;
      var greatestTypeB;
      for (var m = 0; m < bloodArrBPos.length; m++) {
        if (blood_inventory[bloodArrBPos[m]] > greatestB) {
          greatestB = blood_inventory[bloodArrBPos[m]];
          greatestTypeB = bloodArrBPos[m];
        }
      }
      if (greatestB > 0) {
        return BloodType[greatestTypeB];
      } else {
        return false;
      }
    }
    if (patient.blood_type === BloodType.AB_NEG) {
      var greatest = -1;
      var greatestBloodType;
      for (var key in blood_inventory) {
        if (key === 'O_NEG') {
          continue;
        } else if (reNEG.test(key)) {
          // debugger;
          if (blood_inventory[key] > greatest) {
            greatest = blood_inventory[key];
            greatestBloodType = key;
          }
        }
      }
      if (greatest > 0) {
        return BloodType[greatestBloodType];
      } else if (blood_inventory.O_NEG > 0) {
        return BloodType.O_NEG;
      } else {
        return false;
      }
    }

    if (patient.blood_type === BloodType.AB_POS) {
      var greatest2 = -1;
      var greatestBloodType2;
      for (var key2 in blood_inventory) {
        if (blood_inventory[key2] > greatest2) {
          greatest2 = blood_inventory[key2];
          greatestBloodType2 = key2;
        }
      }
      if (greatest2 > 0) {
        return BloodType[greatestBloodType2] || false;
      }
    }

  }

};