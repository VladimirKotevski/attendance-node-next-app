
import { IRegister } from "@/interfaces/Services/Attendance.type";
import APIService from "./Api.service";

export const attendanceService = () => {
  const backendServer = `http://localhost:3001`;

  return {
    register: async (body: IRegister) => {
      const data = await APIService.makePostCall(
        `${backendServer}/attendance/`,
        false,
        { "Content-Type": "application/json" },
        body
      );

      if (data.status) {
        return {
          status: true,
          message: data.message,
          data: data.data,
        };
      }

      return {
        status: false,
        message: data.message || "Failed",
      };
    },

    getAll: async () => {
        const data = await APIService.makeGetCall(
        `${backendServer}/attendance/`,
        false,
        { "Content-Type": "application/json" },
      );

      if (data.status) {
        return {
          status: true,
          message: data.message,
          data: data.data,
        };
      }

      return {
        status: false,
        message: data.message || "Failed",
      };
    },

   
  };
};