"use client";

import { useRef, useState } from "react";
import styles from "./CameraCapture.module.scss";
import Image from "next/image";

type CameraCaptureProps = {
    onCapture: (imageData: string) => void;
};

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [streamStarted, setStreamStarted] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setStreamStarted(true);
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Cannot access camera");
        }
    };

    const captureImage = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        context.drawImage(videoRef.current, 0, 0, 320, 240);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setCapturedImage(dataUrl);
        onCapture(dataUrl);
    };

    return (
        <div className={styles.cameraContainer}>
            {!streamStarted && (
                <button type="button" className={styles.cameraButton} onClick={startCamera}>
                    Start Camera
                </button>
            )}

            {!capturedImage && (<video ref={videoRef} width={320} height={240} autoPlay className={styles.video} />)}

            <canvas ref={canvasRef} width={320} height={240} style={{ display: "none" }} />

            <div className={styles.controls}>
                {streamStarted && (
                    <button type="button" className={styles.cameraButton} onClick={captureImage}>
                        Capture Photo
                    </button>
                )}
            </div>

            {capturedImage && (
                <div className={styles.preview}>
                    <p>Captured Image:</p>
                    <Image
                        src={capturedImage}
                        alt="Captured"
                        width={320}
                        height={240}
                        className={styles.capturedImage}
                    />
                </div>
            )}
        </div>
    );
}