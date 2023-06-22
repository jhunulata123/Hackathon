const express = require("express");
const User = require("../Models/UserSchema");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Jassiisagoodb$oy";

//ROUTE 1: Create a user using : Post "/api/auth/createuser". Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // console.log(req.body);
    const errors = validationResult(req);

    //if there is no error create user with the data else show error
    if (errors.isEmpty()) {
      try {
        //check wether same email user exist already or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res
            .status(400)
            .json({ success, error: "Sorry the user with same email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create user
        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });

        /*
        .then(user => res.json(user))  function is set to await so .then not needed
        .catch(err => {res.json({error: 'Please Enter a unique value'})} );
         return res.send(req.body && user);
        */

        //sending json web token in response to user rather sending username and pass
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }

    // res.send({ errors: errors.array() }); // req.status(400).json({errors:errors.array()});
  }
);

//ROUTE 2: Authenticate a user using: POST "./api/auth/login" .NO login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success,  authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get logged in user details : POST "./api/auth/getuser. " Login required.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;