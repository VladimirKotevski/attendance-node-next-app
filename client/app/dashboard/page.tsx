import { attendanceService } from "@/services/Attendance.service"; 
import { IRegister } from "@/interfaces/Services/Attendance.type";
import ListData from "@/components/List/ListData";


const Dashboard = async () => {
  let attendances: IRegister[] = [];

  const service = attendanceService();

  try {
  const res = await service.getAll(); // returns { status, message, data }
  if (res.status && res.data) {
    attendances = res.data;
  } else {
    console.error("Error fetching attendances:", res.message);
  }
} catch (error) {
  console.error("Error fetching attendance:", error);
}

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 Attendance Dashboard</h1>
      <ListData attendances={attendances} />
    </div>
  );
};

export default Dashboard;