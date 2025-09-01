import { HttpException } from "@/exceptions/HttpException";
import { isEmpty } from "@/utils/util";
import { Attendance } from "@/models/attendance";
import { AttendanceAttrs, AttendanceDoc } from "@/interfaces/attendance.interface";

class AttendanceService {

    public async recordAttendance(attendanceData: AttendanceAttrs): Promise<AttendanceDoc> {
        if (isEmpty(attendanceData)) throw new HttpException(400, "Attendance data is empty");

        const { email, name, image } = attendanceData;

        const lastAttendance = await Attendance.findOne({ email }).sort({ timestamp: -1 });

        let type: "ENTRY" | "EXIT" = "ENTRY";

        if (lastAttendance) {
            type = lastAttendance.type === "ENTRY" ? "EXIT" : "ENTRY";
        }

        const newAttendance = new Attendance({
            name,
            email,
            image,
            type,
            timestamp: new Date(),
        });

        await newAttendance.save();

        return newAttendance;
    }

    public async getAllAttendance(): Promise<AttendanceAttrs[]> {
        return Attendance.find();
    }

    public async getAttendanceByEmail(email: string): Promise<AttendanceDoc[]> {
        if (isEmpty(email)) throw new HttpException(400, "Email is empty");

        const attendanceLogs = await Attendance.find({ email }).sort({ timestamp: -1 });

        if (isEmpty(attendanceLogs)) throw new HttpException(404, `No attendance found for ${email}`);

        return attendanceLogs;
    }

    public async getLastAttendanceByEmail(email: string): Promise<AttendanceDoc | null> {
        if (isEmpty(email)) throw new HttpException(400, "Email is empty");

        const lastAttendance = await Attendance.findOne({ email }).sort({ timestamp: -1 });

        if (!lastAttendance) throw new HttpException(404, `No attendance found for ${email}`);

        return lastAttendance;
    }
}

export default AttendanceService;