import mongoose from "mongoose";
import { AttendanceAttrs, AttendanceDoc } from "@interfaces/attendance.interface";

interface AttendanceModel extends mongoose.Model<AttendanceDoc> {
  build(attrs: AttendanceAttrs): AttendanceDoc;
}

const attendanceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    image: { type: String },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ["ENTRY", "EXIT"], required: true },
  },
);

attendanceSchema.statics.build = (attrs: AttendanceAttrs) => {
  return new Attendance(attrs);
};

const Attendance = mongoose.model<AttendanceDoc, AttendanceModel>(
  "Attendance",
  attendanceSchema
);

export { Attendance };