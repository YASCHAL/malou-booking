import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  username:{
    type: String,
    
  },
  email:{
    type: String,
    
  },
  phone:{
    type: String,
    
  },

  hotelId:{
    type: String,
  },

  selectedRooms: 
  {type: []},

  roomsNumber: {
    type: []
  },
  
  selectedDates:{
    type: [],
  }
})

export default mongoose.model("Reservation", ReservationSchema)