import PageHeader from "@/components/layouts/PageHeader/PageHeader";
import RescueForm from "./RescueApplication";
import styles from "./Rescue.module.scss";
import cx from "classnames";

const Rescue: React.FC = () => {
  return (
    <>
      <PageHeader
        pageHeading="Rescue"
        subHeading="Fill the form to rescue an animal and send them to a nearby vet or animal shelter"
        bgImage="/header-bg/2022-01-03.jpg"
      />
      <div
        className={cx(
          "__page-content container",
          styles["membership-form-wrapper"]
        )}
      >
        <RescueForm />
      </div>
    </>
  );
};

export default Rescue;
