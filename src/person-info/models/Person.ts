import { Schema, model } from "mongoose";

const personSchema = new Schema({
  fname: { type: String, required: [true, "First name is mandatory"] },
  lname: { type: String, required: [true, "Last name is mandatory"] },
  email: { type: String, required: [true, "Email is mandatory"] },
  age:{type:Number,required:[true,'Please add age.']},
  roll:{type:String,required:[true,'Please provide roll number.']},
  phone:{type:String,required:[true,'Please provide phone number.']},
  dob:{type:Date,required:[true,'Please provide date of birth.']},
  gender:{type:String,required:[true,'Please provide your gender.']},
});

export default model("Person", personSchema);
