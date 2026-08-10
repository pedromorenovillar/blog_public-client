import { LoaderCircle } from "lucide-react";
import styles from "./Spinner.module.css";

export default function Spinner({ size = 40 }) {
  return (
    <div className={styles.spinnerContainer}>
      <LoaderCircle className={styles.spinner} size={size} />
    </div>
  );
}
