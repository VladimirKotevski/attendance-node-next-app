import { NextFunction, Request, Response } from "express";
import AttendanceService from "@/services/attendance.service";
import { AttendanceAttrs, AttendanceDoc } from "@/interfaces/attendance.interface";

class AttendanceController {
    public attendanceService = new AttendanceService();

    public recordAttendance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const attendanceData: AttendanceAttrs = req.body;

            const attendance: AttendanceDoc = await this.attendanceService.recordAttendance(attendanceData);

            res.status(201).json({
                data: attendance,
                message: "Attendance recorded",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    };

    public getAllAttendance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const attendanceRecords = await this.attendanceService.getAllAttendance();
            res.status(200).json({
                data: attendanceRecords,
                message: "All attendance records fetched successfully",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    };

    public getAttendanceByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email: string = req.params.email;

            const attendance: AttendanceDoc[] = await this.attendanceService.getAttendanceByEmail(email);

            res.status(200).json({
                data: attendance,
                message: "Attendance history",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    };

    public getLastAttendanceByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email: string = req.params.email;

            const lastAttendance: AttendanceDoc | null = await this.attendanceService.getLastAttendanceByEmail(email);

            res.status(200).json({
                data: lastAttendance,
                message: "Last attendance record",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default AttendanceController;