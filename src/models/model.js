const mongoose = require("mongoose");
const enum_values=require('../Libs/constant');

const StudentSchema = mongoose.Schema({
    student_uid: {type: String,unique: true,required: true,},
    email_id: { type: String, required: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    phone_no:{type:Number, required:true},
    is_checked:{type:Boolean,default:false},
    is_active: { type: Boolean, default: true,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    is_deleted: { type: Boolean, default: false,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  });
  
  StudentSchema.pre("save", function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });


  const MendorSchema = mongoose.Schema({
    mendor_uid: {type: String,unique: true,required: true,},
    email_id: { type: String, required: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    phone_no:{type:Number, required:true},
    profession:{type:String, required:true},
    organization:{type:String, required:true},
    is_active: { type: Boolean, default: true,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    is_deleted: { type: Boolean, default: false,enum: {values:enum_values.ACTIVE_VALUES,message:enum_values.ENUM_ERROR_MESSAGE}},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  });
  
  MendorSchema.pre("save", function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
      this.created_at = now;
    }
    next();
  });

  module.exports = {
    Student: mongoose.model("Student_Accounts", StudentSchema),
    Mendor: mongoose.model("Mendor_Accounts", MendorSchema),
  };