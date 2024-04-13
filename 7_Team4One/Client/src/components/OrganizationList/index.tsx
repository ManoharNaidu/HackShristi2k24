import React, { useEffect, useState } from "react";
import styles from "./OrganizationList.module.scss";
import { toast } from "react-toastify";
import getOrganizations from "@/utils/api/getOrganizations";
import Avatar from "../ui/Avatar/Avatar";

// dummy list of organizations that rescue animals

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

const OrganizationList = () => {
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
          setOrganizations(
            [...data.organizations, ...dummyOrganizations].slice(0, 5)
          );
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className={styles.orgList}>
      <h3 className={styles.title}>Find help nearby </h3>
      <hr />
      <div className={styles.sideOrg}>
        <ul>
          {organizations.map((org, i) => (
            <React.Fragment key={org.id}>
              <li>
                {org.avatar?.startsWith("http") ? (
                  <img src={org.avatar} alt="avatar" />
                ) : (
                  <Avatar size="50px" avatar={org.avatar} />
                )}
                <div>
                  <a href={"#"}>{org.first_name}</a>
                  <p>
                    {org.state}, {org.country}
                  </p>
                </div>
              </li>
              {i !== organizations.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrganizationList;
