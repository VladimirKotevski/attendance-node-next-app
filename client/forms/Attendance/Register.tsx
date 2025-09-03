"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { recordAttendance } from "./Actions";
import styles from "./AttendanceForm.module.scss";
import CameraCapture from "@/components/Camera/CameraCapture";

const initialState = { message: "" };

export default function AttendanceForm() {
  const [state, formAction] = useActionState(recordAttendance, initialState);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  console.log('captured', capturedImage)

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        disabled={pending}
        className={styles.submitButton}
      >
        {pending ? "Submitting..." : "Submit Attendance"}
      </button>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <form action={formAction} className={styles.formContainer}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className={styles.inputField}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={styles.inputField}
        />

        <CameraCapture onCapture={setCapturedImage} />

        {capturedImage && <input type="hidden" name="image" value={capturedImage} />}

        <SubmitButton />

        {state.message && (
          <p
            role="status"
            className={`${styles.message} ${
              state.message.includes("❌") ? styles.error : styles.success
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}