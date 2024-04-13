import React, { useEffect } from "react";

import styles from "./Donation.module.scss";
import donateBtn from "../../assets/donate.svg";
import PageHeader from "@/components/layouts/PageHeader/PageHeader";
import Modal from "@/components/ui/Modal/Modal";
import SchemaForm from "@/components/forms";
import { useState } from "react";
import Button from "@/components/ui/Elements/Button";
import { FieldValues } from "react-hook-form";
import { Post } from "@/components/ui/Post";
import { PostType } from "@/types/Post.type";
import { toast } from "react-toastify";
import getPostById from "@/utils/api/getPostById";
import getDonationPosts from "@/utils/api/getDonationPosts";

const mockDonarsList: PostType[] = [
  {
    first_name: "Help merry",
    last_name: null,
    avatar: "./animals/goat2.jpg",
    description:
      "Thank you for supporting and helping these poor sick animals.",
    id: "1",
    pictures: ["./animals/goat2.jpg"],
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    first_name: "Please help poor cat",
    avatar: "./animals/cat.jpg",
    pictures: ["./animals/cat.jpg"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    id: "2",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    id: "3",
    first_name: "Kindly support them",
    avatar: "./animals/cat2.webp",
    pictures: ["./animals/cat2.webp"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    id: "4",
    first_name: "Please help poor cow",
    avatar: "./animals/cow1.jpg",
    pictures: ["./animals/cow1.jpg"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    id: "5",
    first_name: "Help this mother dog",
    avatar: "./animals/dogs_sick.jpg",
    pictures: ["./animals/dogs_sick.jpg"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    id: "6",
    first_name: "Please help them",
    avatar: "./animals/dogs3.jpg",
    pictures: ["./animals/dogs3.jpg"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    id: "7",
    first_name: "Take care to them",
    avatar: "./animals/goat3.jpg",
    pictures: ["./animals/goat3.jpg"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    id: "8",
    first_name: "Please help me",
    avatar: "./animals/cow3.jpg",
    pictures: ["./animals/cow3.jpg"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    id: "9",
    first_name: "Hey human help us",
    avatar: "./animals/cat4.jpg",
    pictures: ["./animals/cat4.jpg"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
  {
    id: "10",
    first_name: "Hello sir help me ",
    avatar: "./animals/dogs2.jpg",
    pictures: ["./animals/dogs2.jpg"],
    description:
      "Thank you for supporting and helping these poor sick animals.",
    last_name: null,
    created_at: "2021-09-01T12:00:00",
    post_type: "post",
    user_id: "1",
  },
];

export const DonateForm: React.FC<{
  onSubmit: (data: FieldValues) => void;
}> = ({ onSubmit }) => {
  return (
    <div className={styles.donateForm}>
      <SchemaForm
        schema={[
          {
            name: "amount",
            type: "number",
            required: "Amount is required",
            label: "Amount (in Rupees)",
          },
          {
            name: "message",
            type: "textarea",
            label: "Message",
          },
        ]}
        onSubmit={onSubmit}
      />
    </div>
  );
};

interface IOrganisationCardProps {
  data: PostType;
  loading: boolean;
  fetchDonationPost: (id: string) => void;
}
const Donars: React.FC<IOrganisationCardProps> = ({
  data,
  loading,
  fetchDonationPost,
}) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["imgBox"]}>
        <img
          src={
            data.pictures[0]
              ? `${import.meta.env.VITE_SERVER_BASE_URL}/media/post-media/${
                  data.pictures[0]
                }`
              : "/nitap-logo.svg"
          }
          alt="img"
        />
      </div>
      <div className={styles["content"]}>
        <h3>{data.first_name}</h3>
        <p>{data.description}</p>
      </div>
      <Button
        disabled={loading}
        className={styles["btn"]}
        onClick={() => {
          fetchDonationPost(data.id);
        }}
      >
        <img src={donateBtn} alt="donate" />
        <span>Donate Now</span>
      </Button>
    </div>
  );
};
const DonationPage: React.FC = () => {
  const [donorsList, setDonorsList] = useState<PostType[]>([]);

  const [donationPost, setDonationPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const post = await getPostById(id);
      if (post) {
        setDonationPost(post.post);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDonors = async () => {
      const donors = await getDonationPosts();
      if (donors) {
        setDonorsList([...donors.posts, ...mockDonarsList]);
      }
    };

    fetchDonors();
  }, []);

  return (
    <React.Fragment>
      <PageHeader
        bgImage="hero.png"
        pageHeading="Give a little, help a lot. Donate now!"
        subHeading="Your one donation can save a life of these poor animals. One Rupee may change to one life"
      />
      <div className="__page-content container">
        <div className={styles["grid-box"]}>
          {donorsList.map((org, index) => {
            return (
              <Donars
                data={org}
                loading={loading}
                fetchDonationPost={(id) => {
                  fetchPost(id);
                }}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <Modal
        modalTitle="Donate Now"
        setIsOpen={(isOpen) => {
          if (!isOpen) setDonationPost(null);
        }}
        isOpen={!!donationPost}
      >
        <div className={styles.donateModal}>
          {donationPost && (
            <Post
              created_at={donationPost.created_at}
              description={donationPost.description}
              pictures={donationPost.pictures}
              userName={donationPost.first_name}
              userAvatar={donationPost.avatar}
              post_type="post"
            />
          )}
          <DonateForm
            onSubmit={(data) => {
              console.log(data);
              toast.success(`You donated Rs. ${data.amount}!`);
              setDonationPost(null);
            }}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};
export default DonationPage;
