import SchemaForm from "@/components/forms";
import Button from "@/components/ui/Elements/Button";
import styles from "@/components/layouts/dashboard/Dashboard.module.scss";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import Alert from "@/components/ui/Alert/Alert";
import { Table, TableCell, TableRow } from "@/components/ui/Table/FlexTable";
import useUser from "@/hooks/user";
import { toast } from "react-toastify";
import getNearbyOrganizations from "@/utils/api/getNearbyOrganizations";
import rescueFormSubmit from "@/utils/api/rescueFormSubmit";

const RescueForm = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onSubmit = async (data: FieldValues) => {
    if (!location) {
      toast.error("Location is required to submit the form");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "pictures" && data[key].length > 0) {
        for (let i = 0; i < data[key].length; i++) {
          formData.append(key, data[key][i]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });
    formData.append("location_lat", location.lat.toString() || "");
    formData.append("location_lng", location.lng.toString() || "");

    try {
      const response = await rescueFormSubmit(formData);
      if (response?.success) {
        toast.success(response.message);
        setErrorMsg("Application submitted successfully");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [organizations, setOrganizations] = useState<
    | {
        label: string;
        value: string;
      }[]
    | null
  >(null);

  const fetchNearbyOrganizationsList = async (location: {
    lat: number;
    lng: number;
  }) => {
    try {
      setLoading(true);
      const response = await getNearbyOrganizations(location);
      if (response?.organizations) {
        setOrganizations(
          response.organizations.map((org) => ({
            label: org.first_name,
            value: org.id,
          }))
        );
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchNearbyOrganizationsList(location);
    }
  }, [location]);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("asking for location");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          toast.error(`Error: ${error.message}`);
          setErrorMsg(
            "Location is required to fetch nearby shelters and organizations"
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return !location ? (
    <Alert severity="warning">
      Please enable location to fetch nearby shelters and organizations
    </Alert>
  ) : loading ? (
    <p>Please wait</p>
  ) : errorMsg ? (
    <Alert>{errorMsg}</Alert>
  ) : (
    user && (
      <>
        <section className={styles["box"]}>
          <h1 className={styles["title"]}>Your details</h1>
          <Table>
            <TableRow header>
              <TableCell>Personal details</TableCell>
            </TableRow>
            <TableRow>
              <TableCell type="label">Full name</TableCell>
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>
            </TableRow>
          </Table>

          <Table>
            <TableRow header>
              <TableCell>Address</TableCell>
              <TableCell>Email & Phone</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <p>{user.address}</p>
                <p>
                  {user.city}, {user.state}
                </p>
                <p>{`${user.country} (${user.pincode})`}</p>
              </TableCell>
              <TableCell>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </TableCell>
            </TableRow>
          </Table>
        </section>
        <section className={styles["box"]}>
          <SchemaForm
            schema={[
              { type: "section", label: "Details of the animal to be rescued" },
              {
                name: "animal_name",
                label: "Name of the animal",
                type: "text",
                required: "This field is required",
              },
              {
                name: "org_id",
                label: "Nearby Organisation",
                type: "select",
                required: "This field is required",
                options: organizations || [],
              },
              {
                name: "description",
                label: "Brief description of the animal",
                type: "textarea",
                required: "This field is required",
              },
              {
                name: "pictures",
                label: "Pictures of the animal",
                type: "file",
                required: "This field is required",
                multiple: true,
                allowedFormats: [
                  "image/jpeg",
                  "image/png",
                  "image/jpg",
                  "image/webp",
                ],
              },
            ]}
            onSubmit={onSubmit}
            actions={
              <Button type="submit" variant="primary">
                Submit
              </Button>
            }
          />
        </section>
      </>
    )
  );
};

export default RescueForm;
