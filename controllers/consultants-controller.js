import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Consultants from "../models/Consultants";

export const addconsultant = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
      return res.status(404).json({ message: "Token Not Found" });
    }
  

    let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new consultant
  const { name, description, availableDates, featured, jobs,country } =
    req.body;
  if (
    !name &&
    name.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !jobs &&
    jobs.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let Consultant;
  try {
    Consultant = new Consultants({
      description,
      availableDates: new Date(`${availableDates}`),
      featured,
      jobs,
      admin: adminId,
      name,
      country,
    });

    const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await Consultant.save({ session });
        adminUser.addedConsultants.push(Consultant);
        await adminUser.save({ session });
        await session.commitTransaction();

    Consultant = await Consultant.save();
}catch (err){
    return console.log(err);
}

if (!Consultant){
    return res.status(500).json({message:"Request Faild"})
}

return res.status(201).json({ Consultant})
//     const session = await mongoose.startSession();
//     const adminUser = await Admin.findById(adminId);
//     session.startTransaction();
//     await movie.save({ session });
//     adminUser.addedMovies.push(movie);
//     await adminUser.save({ session });
//     await session.commitTransaction();
//   } catch (err) {
//     return console.log(err);
//   }

//   if (!movie) {
//     return res.status(500).json({ message: "Request Failed" });
//   }

//   return res.status(201).json({ movie });
};

export const getAllconsultant = async (req, res, next) => {

  let consultant;

  try {
    consultant = await Consultants.find();
  } catch (err) {
    return console.log(err);
  }

  if (!consultant) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ consultant });

};

export const getconsultantById = async (req, res, next) => {
  const id = req.params.id;
  let consultant;
  try {
    consultant = await Consultants.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!consultant) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ consultant });
};




