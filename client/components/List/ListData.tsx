"use client";

import { IRegister } from "@/interfaces/Services/Attendance.type";
import { Box, Avatar, Typography } from "@mui/material";

export default function AttendanceList({ attendances }: { attendances: IRegister[] }) {
  if (!attendances || attendances.length === 0) {
    return <Typography>Norecords found.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
      }}
    >
      {attendances.map((record) => (
        <Box
          key={record.email}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 2,
            borderRadius: 2,
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            boxShadow: 1,
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 3,
            },
          }}
        >
          <Avatar
            src={record.image || ""}
            alt={record.name}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="h6">{record.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {record.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {record.timestamp && new Date(record.timestamp).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}