import { useAuthContext } from "../../../hooks/useAuthContext";
import styles from "./style.module.css";

export const AppHeader = () => {
  const { signOut } = useAuthContext();
  return (
    <header className={styles.header}>
      <p className={styles.title}>Todo アプリ</p>
      <button className={styles.logoutButton} onClick={signOut}>ログアウト</button>
    </header>
  );
};
