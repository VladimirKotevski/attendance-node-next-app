import { Router } from "express";
import { Routes } from "@/interfaces/routes.interface";
import AttendanceController from "@/controllers/attendance.controller";
import { useCache } from "@/middlewares/cache.middleware";

class AttendanceRoute implements Routes {
  public path = "/attendance";
  public router = Router();
  public attendanceController = new AttendanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /attendance:
     *  post:
     *      tags:
     *        - Attendance
     *      summary: Record a new attendance event (ENTRY or EXIT)
     *      produces:
     *          - application/json
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                name:
     *                  type: string
     *                  example: "John Doe"
     *                email:
     *                  type: string
     *                  example: "john@example.com"
     *                image:
     *                  type: string
     *                  example: "https://example.com/avatar.png"
     *      responses:
     *          200:
     *              description: Attendance recorded successfully
     */ // POST - /attendance
    this.router.post("/attendance", this.attendanceController.recordAttendance);

    /**
     * @swagger
     * /attendance:
     *  get:
     *      tags:
     *        - Attendance
     *      summary: Get all attendance records
     *      responses:
     *          200:
     *              description: List of all attendance records
     */ // GET - /attendance
    this.router.get("/attendance", useCache("attendance"), this.attendanceController.getAllAttendance);

    /**
     * @swagger
     * /attendance/{email}:
     *  get:
     *      tags:
     *        - Attendance
     *      summary: Get all attendance logs for a given email
     *      parameters:
     *        - name: email
     *          in: path
     *          required: true
     *          schema:
     *            type: string
     *            example: "john@example.com"
     *      responses:
     *          200:
     *              description: List of attendance records
     */ // GET - /attendance/:email
    this.router.get("/attendance/:email", this.attendanceController.getAttendanceByEmail);

    /**
     * @swagger
     * /attendance/last/{email}:
     *  get:
     *      tags:
     *        - Attendance
     *      summary: Get the last attendance action (ENTRY/EXIT) for a given email
     *      parameters:
     *        - name: email
     *          in: path
     *          required: true
     *          schema:
     *            type: string
     *            example: "john@example.com"
     *      responses:
     *          200:
     *              description: Last attendance action
     */ // GET - /attendance/last/:email
    this.router.get("/attendance/last/:email", this.attendanceController.getLastAttendanceByEmail);
  }
}

export default AttendanceRoute;