import React from "react";
import Image from "next/image";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Image
        src="/icon.svg"
        alt="Loading"
        width={56}
        height={50}
        className={styles.loadingImage}
      />
    </div>
  );
}
