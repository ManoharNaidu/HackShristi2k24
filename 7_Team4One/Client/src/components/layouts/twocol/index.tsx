import styles from "./Dashboard.module.scss";

interface TwoColLayout {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}
const TwoColLayout: React.FC<TwoColLayout> = ({ children, sidebar }) => (
  <div className={styles["layout"]}>
    <div className={styles["content"]}>{children}</div>
    <div className={styles["sidebar"]}>{sidebar}</div>
  </div>
);

export default TwoColLayout;
