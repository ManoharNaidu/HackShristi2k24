import SchemaForm from "@/components/forms";
import Button from "@/components/ui/Elements/Button";
import cx from "classnames";
import { EditPencil } from "iconoir-react";
import Modal from "@/components/ui/Modal/Modal";
import { useCallback, useEffect, useState } from "react";
import readProfile from "@/utils/api/readProfile";
import updateProfileApi from "@/utils/api/updateProfile";
import updateAvatarApi from "@/utils/api/updateAvatar";
import useUser from "@/hooks/user";
import EditAvatar from "@/components/ui/Avatar/EditAvatar";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import AvatarUpload from "@/components/forms/AvatarUpload";
import personalDetailsFormSchema from "@/utils/formSchema/personalDetailsFormSchema";
import orgDetailsFormSchema from "@/utils/formSchema/orgDetailsFormSchema";
import { FieldValues } from "react-hook-form";
import { PersonalDetailsType } from "@/types/Profile.type";
import { toast } from "react-toastify";
import Alert from "@/components/ui/Alert/Alert";

interface PersonalDetailsFormProps {
  prefillData: FieldValues;
  onSubmit: (data: FieldValues) => void;
}
const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  prefillData,
  onSubmit,
}) => {
  const { user } = useUser();
  let formSchema = personalDetailsFormSchema;

  if (user?.role.includes("org")) {
    formSchema = orgDetailsFormSchema;
  }

  return (
    <SchemaForm
      prefillData={prefillData}
      schema={formSchema}
      onSubmit={onSubmit}
      actions={
        <Button type="submit" className="primary">
          Save changes
        </Button>
      }
    />
  );
};

const PersonalDetails = () => {
  const { user, fetchUser } = useUser();

  const [isProfileFormModalOpen, setIsProfileFormModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsType>();

  const updateProfile = async (data: FieldValues) => {
    if (!user?.first_name && user?.role.includes("org")) {
      if (!location) {
        return toast.error("Location is required for organization profile");
      }
      data.location_lat = location.location_lat;
      data.location_lng = location.location_lng;
    }
    try {
      const response = await updateProfileApi(data as PersonalDetailsType);
      if (response?.success) {
        fetchProfile();

        setIsProfileFormModalOpen(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateAvatar = async (file: File) => {
    try {
      const data = await updateAvatarApi(file); // Await the updateAvatarApi function call
      if (data?.success) {
        fetchProfile();
        setIsProfileModalOpen(false);
        toast.success("Profile picture updated successfully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = useCallback(async () => {
    try {
      const data = await readProfile();
      if (data?.success) {
        setPersonalDetails((prev) => ({
          ...prev,
          ...data.user,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();

    return () => {
      fetchUser();
    };
  }, [fetchProfile, fetchUser]);

  const [location, setLocation] = useState<{
    location_lat: number;
    location_lng: number;
  } | null>(null);

  useEffect(() => {
    if (user?.role.includes("org")) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              location_lat: position.coords.latitude,
              location_lng: position.coords.longitude,
            };
            // You can set location to state or send it to server
            setLocation(location);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }, [user]);

  return personalDetails?.first_name ? (
    <>
      <section className={cx(styles.box, styles["basic-info-wrapper"])}>
        <div className={styles["actions"]}>
          <Button
            variant="default"
            onClick={() => setIsProfileFormModalOpen(true)}
          >
            <div
              className={styles.editProfileBtn}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.25rem",
                alignItems: "center",
              }}
            >
              <EditPencil />
              Edit
            </div>
          </Button>
          <Modal
            isOpen={isProfileFormModalOpen}
            modalTitle="Edit personal details"
            setIsOpen={(val) => {
              setIsProfileFormModalOpen(val);
            }}
          >
            <section className={styles.box}>
              <PersonalDetailsForm
                prefillData={
                  {
                    ...personalDetails,
                    email: user?.email,
                  } as FieldValues
                }
                onSubmit={updateProfile}
              />
            </section>
          </Modal>
        </div>
        <div className={styles["basic-info"]}>
          <div className={styles["avatar-container"]}>
            <EditAvatar
              size="120px"
              avatar={personalDetails.avatar}
              className={styles["avatar-crop"]}
            />
            <Button
              className={styles["avatar-edit"]}
              onClick={() => {
                setIsProfileModalOpen(true);
              }}
            >
              <EditPencil />
            </Button>
            <Modal
              isOpen={isProfileModalOpen}
              setIsOpen={(val) => {
                setIsProfileModalOpen(val);
              }}
              modalTitle="Change profile picture"
            >
              <AvatarUpload
                avatar={personalDetails.avatar}
                updateAvatar={updateAvatar}
              />
            </Modal>
          </div>
          <div className={styles["basic-info-content"]}>
            <h2 className={styles["title"]}>
              {personalDetails.first_name} {personalDetails.last_name}
            </h2>
            <div className={styles["subtitle"]}>
              <p>
                <span title="Email">{user?.email}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.box}>
        <h3 className={styles.title}>Contact details</h3>
        <div className={styles["box-table"]}>
          <div className={cx(styles["box-row"], styles.header)}>
            <div className={styles["col"]}>
              <h4 className={styles["box-col-header"]}>Address</h4>
            </div>
            <div className={styles["col"]}>
              <h4 className={styles["box-col-header"]}>Email & Phone</h4>
            </div>
          </div>
          <div className={styles["box-row"]}>
            <div className={styles["col"]}>
              <p className={styles["value"]}>{personalDetails.address}</p>
              <p className={styles["value"]}>
                {personalDetails.city}, {personalDetails.state}
              </p>
              <p
                className={styles["value"]}
              >{`${personalDetails.country} (${personalDetails.pincode})`}</p>
            </div>
            <div className={styles["col"]}>
              <p className={styles["value"]}>{user?.email}</p>
              <p className={styles["value"]}>{personalDetails.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <>
      <Alert severity="info">
        {user &&
          (user.role.includes("org")
            ? "Enter your organization details"
            : "Complete your profile")}
      </Alert>
      {user?.role.includes("org") && !location && (
        <Alert severity="warning">
          Location access is required to create an organization profile
        </Alert>
      )}

      {user?.role.includes("org") && location && (
        <Alert>
          Your location is: {location.location_lat}, {location.location_lng}
        </Alert>
      )}
      <section className={styles.box}>
        <PersonalDetailsForm
          prefillData={
            { ...personalDetails, email: user?.email } as FieldValues
          }
          onSubmit={updateProfile}
        />
      </section>
    </>
  );
};

export default PersonalDetails;
