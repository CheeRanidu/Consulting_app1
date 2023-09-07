import mongoose from "mongoose";
import Booking from "../models/Bookings";
import Consultants from "../models/Consultants";
import User from "../models/User";

export const newBooking = async (req, res, next) => {
    const { consultant, date, time, user } = req.body;


     let existingConsultants;
     let existingUser;
     try {
      existingConsultants = await Consultants.findById(consultant);
       existingUser = await User.findById(user);
     } catch (err) {
       return console.log(err);
     }
     if (!existingConsultants) {
       return res.status(404).json({ message: "Movie Not Found With Given ID" });
     }
     if (!user) {
       return res.status(404).json({ message: "User not found with given ID " });
    }

    let booking;
  
    try {
      booking = new Booking({
        consultant,
        date: new Date(`${date}`),
        time,
        user,
      });

       const session = await mongoose.startSession();
       session.startTransaction();
       existingUser.bookings.push(booking);
       existingConsultants.bookings.push(booking);
       await existingUser.save({ session });
       await existingConsultants.save({ session });
       await booking.save({ session });
       session.commitTransaction();

    // booking = await booking.save();
    } catch (err) {
      return console.log(err);
    }
  
    if (!booking) {
      return res.status(500).json({ message: "Unable to create a booking" });
    }
  
    return res.status(201).json({ booking  });
};
 
export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndRemove(id).populate("user consultant");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.consultant.bookings.pull(booking);
    await booking.consultant.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};