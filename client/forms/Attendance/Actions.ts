"use server";

import { attendanceService } from "@/services/Attendance.service";
import { z } from "zod";

export async function recordAttendance(
  prevState: { message: string },
  formData: FormData
) {
  const formDataObj = Object.fromEntries(formData.entries());

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    image: z.string().min(1, "Image is required"),
  });

  const result = schema.safeParse(formDataObj);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue: { message: any; }) => issue.message)
      .join(", ");
    return { message: `Form submission failed: ${errorMessage}` };
  }

  try {
    const response = await attendanceService().register(result.data);

    if (response.status) {
      return {
        message: response.message || "Attendance recorded successfully!",
      };
    } else {
      return {
        message: "Failed to record attendance: " + (response.message || ""),
      };
    }
  } catch (error) {
    console.error("Attendance error:", error);
    return { message: "Error recording attendance." };
  }
}