import { useEffect, useState } from "react";
import PageHeader from "../../components/layouts/PageHeader/PageHeader";
import styles from "./organisation.module.scss";
import cx from "classnames";
import getOrganizations from "@/utils/api/getOrganizations";
import { toast } from "react-toastify";

const dummyOrganizations = [
  {
    id: "1",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWScwFdBwyd3X1wmw57yx0uOIaHgKRMneJKf9az1zLLg&s",
    first_name: "sharda stray foundation",
    last_name: null,
    url: "https://example.com",
    country: "Nepal",
    state: "Kathmandu",
    address: " 42 jan ,2015",
  },
  {
    id: "2",
    avatar:
      "https://dynamic.brandcrowd.com/asset/logo/3a3f54e6-3f66-47cd-90c6-32fc7c92fcbf/large?logoTemplateVersion=1&v=638439085781441630",
    first_name: "Purucat House",
    last_name: null,
    url: "https://example.com",
    country: "India",
    state: "tamilnadu, India",
    address: "24 july ,2013",
  },
  {
    id: "3",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-kTnBeoUCgUnKjCZ5zJVcqmw5a4k8G33o3hvma2_85A&s",
    first_name: "Chandrashaker gau shala",
    last_name: null,
    url: "https://example.com",
    country: "Indonesia",
    state: "koyom batur",
    address: " 31 feb ,2010",
  },
  {
    id: "4",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeHZbYSXoWT8oGLBXzjWPk-NlID7XJYtCV7j_yOYiLNQ&s",
    first_name: "sharda stray foundation",
    last_name: null,
    url: "https://example.com",
    country: "Nepal",
    state: "Kathmandu",
    address: " 42 jan ,2015",
  },
  {
    id: "5",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksP8KGtG4jZviU3GaWLQVc600H_xi28dC-A&s",
    first_name: "Purucat House",
    last_name: null,
    url: "https://example.com",
    country: "Nepal",
    state: "tamilnadu",
    address: "24 july ,2013",
  },
  {
    id: "6",
    avatar:
      "https://l450v.alamy.com/450v/2dkttc4/animal-shelter-flat-icon-color-simple-element-from-volunteering-collection-creative-animal-shelter-icon-for-web-design-templates-infographics-and-2dkttc4.jpg",
    first_name: "Chandrashaker gau shala",
    last_name: null,
    url: "https://example.com",
    country: "Nepal",
    state: "koyom batur",
    address: " 31 feb ,2010",
  },
];

const Organization: React.FC<{
  id: string;
  avatar: string;
  first_name: string;
  country: string;
  state: string;
  address: string;
}> = (org) => {
  return (
    <li className={styles.org} key={org.id}>
      <img
        src={
          org.avatar.startsWith("http")
            ? org.avatar
            : `${import.meta.env.VITE_SERVER_BASE_URL}/media/avatars/${
                org.avatar
              }`
        }
        alt={org.first_name}
      />
      <div>
        <h2>{org.first_name}</h2>
        <h3>
          {org.state}, {org.country}
        </h3>
        <p>{org.address}</p>
      </div>
    </li>
  );
};

const Organisations: React.FC = () => {
  const [organizations, setOrganizations] = useState<
    {
      id: string;
      avatar: string;
      first_name: string;
      country: string;
      state: string;
      address: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        if (data?.organizations) {
          setOrganizations([...data.organizations, ...dummyOrganizations]);
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <>
      <PageHeader bgImage="hero.jpeg">
        <div className={cx(styles.header)}>
          <div className={styles["header-content"]}>
            <h1 className={styles.heading}>Not Every Hero wears A CAPE</h1>
            <p>
              The organizations that are working to make the world a better
              place for animals.
            </p>
          </div>
        </div>
      </PageHeader>

      <div className="__page-content container">
        <div className={styles.Orgcontainer}>
          <h2>Organizations</h2>
          <hr />
          <div className={styles.Orgshow}>
            <ul>
              {organizations.map((org) => (
                <Organization key={org.id} {...org} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organisations;
