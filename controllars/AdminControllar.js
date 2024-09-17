import Administrative from "../models/AdminModel.js";
import jwt from "jsonwebtoken";
// Get the administrative record
export const getAdministrative = async (req, res) => {
  try {
    const administrative = await Administrative.findById(req.user.adminId);
    if (!administrative) {
      return res
        .status(404)
        .json({ message: "Administrative record not found" });
    }
    res.status(200).json(administrative);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create the administrative record
export const createAdministrative = async (req, res) => {
  const { InstituteName, InstituteCode, contactNumber, email, password } =
    req.body;

  try {
    // const existingAdmin = await Administrative.findOne({InstituteCode : InstituteCode});
    // if (existingAdmin) {
    //   return res
    //     .status(400)
    //     .json({ message: "Administrative record already exists" });
    // }

    const administrative = new Administrative({
      InstituteName,
      InstituteCode,
      contactNumber,
      email,
      password,
    });
    await administrative.save();
    res.status(201).json(administrative);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the administrative record
export const updateAdministrative = async (req, res) => {
  try {
   
    const administrative = await Administrative.findByIdAndUpdate(
      req.params.id,
      req.body,

      { new: true }
    );
    res.status(200).json(administrative);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Administrative.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Email not found " });
    }

    if (admin.password != password) {
      return res.status(400).json({ message: "Invalid  password" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
