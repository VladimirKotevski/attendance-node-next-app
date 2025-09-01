export interface AttendanceAttrs {
  name: string;
  email: string;
  image?: string;
  type: "ENTRY" | "EXIT";
}

export interface AttendanceDoc {
  id: string;
  name: string;
  email: string;
  image?: string;
  timestamp: Date;
  type: "ENTRY" | "EXIT";
}