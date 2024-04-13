import { useState } from "react";
import styles from "./Post.module.scss";
import Avatar from "../Avatar/Avatar";
import {
  ArrowLeft,
  ArrowRight,
  Donate,
  Post as PostIcon,
  Heart,
  Plus,
} from "iconoir-react";
import Button from "../Elements/Button";
import useUser from "@/hooks/user";
import Modal from "../Modal/Modal";
import SchemaForm from "@/components/forms";
import { Link } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import createPost from "@/utils/api/createPost";
import { toast } from "react-toastify";
import eventEmitter from "@/config/eventEmitter.config";
import { getDateWithTime } from "@/utils/helper";
import { DonateForm } from "@/views/donation/Page";

export const PictureCarousel: React.FC<{ pictures: string[] }> = ({
  pictures,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : pictures.length - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < pictures.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className={styles.pictures}>
      {pictures.map((picture, index) => (
        <img
          key={index}
          src={`${
            import.meta.env.VITE_SERVER_BASE_URL
          }/media/post-media/${picture}`}
          alt="carousel"
          style={{
            display: index === activeIndex ? "block" : "none",
          }}
        />
      ))}
      {pictures.length > 1 && (
        <>
          <Button className={styles.scrollBtn} onClick={handlePrev}>
            <ArrowLeft />
          </Button>
          <Button className={styles.scrollBtn} onClick={handleNext}>
            <ArrowRight />
          </Button>
        </>
      )}
    </div>
  );
};

export const Post: React.FC<{
  userName: string;
  description: string;
  created_at: string;
  post_type: "post" | "donation";
  userAvatar?: string | null;
  pictures?: string[];
}> = ({
  userName,
  description,
  pictures,
  userAvatar,
  created_at,
  post_type,
}) => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <Avatar size="2.2rem" avatar={userAvatar} />
        <div className={styles.meta}>
          <div className={styles.textContent}>
            <p className={styles.userName}>{userName}</p>
            <time className={styles.timeStamp}>
              {getDateWithTime(created_at)}
            </time>
          </div>
          {post_type === "donation" ? <Donate /> : <PostIcon />}
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.description}>{description}</p>
        {!!pictures?.length && <PictureCarousel pictures={pictures} />}
      </main>
      {post_type === "donation" && (
        <>
          <footer className={styles.footer}>
            <Button
              onClick={() => setIsDonateModalOpen(true)}
              className={styles.donateBtn}
            >
              <Donate />
              Donate
            </Button>
          </footer>
          <Modal
            modalTitle="Donate"
            isOpen={isDonateModalOpen}
            setIsOpen={setIsDonateModalOpen}
          >
            <div className={styles.donateModal}>
              <DonateForm
                onSubmit={(data) => {
                  console.log(data);
                  toast.success(`You donated Rs. ${data.amount}!`);
                  setIsDonateModalOpen(false);
                }}
              />
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export const CreatePost: React.FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (data: FieldValues) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "pictures" && data[key]?.length > 0) {
        const files = data[key];
        for (let i = 0; i < files.length; i++) {
          formData.append("pictures", files[i]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      setLoading(true);
      const resData = await createPost(formData);
      if (resData) {
        toast.success(resData.message);
        eventEmitter.emit("postCreated");
        setIsPostModalOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createPost}>
      <Button
        variant="secondary"
        onClick={() => {
          setIsPostModalOpen(true);
        }}
        className={styles.createPostBtn}
      >
        <Plus color="black" fontSize={"2rem"} />
      </Button>
      <p>Create a post</p>

      <Modal
        modalTitle="Create new post"
        setIsOpen={setIsPostModalOpen}
        isOpen={isPostModalOpen}
      >
        <div className={styles.createPostModal}>
          <div className={styles.createPostForm}>
            <SchemaForm
              schema={[
                {
                  name: "post_type",
                  type: "radio",
                  required: "Post type is required",
                  label: "Select post type",
                  options: [
                    { label: "Post", value: "post" },
                    { label: "Seeking donation", value: "donation" },
                  ],
                },
                {
                  name: "description",
                  type: "textarea",
                  required: "Description is required",
                  label: "Write your post",
                },
                {
                  name: "pictures",
                  type: "file",
                  multiple: true,
                  allowedFormats: ["image/png", "image/jpeg", "image/webp"],
                  label: "Photos",
                },
              ]}
              onSubmit={handleCreatePost}
              loading={loading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Rescue: React.FC = () => {
  return (
    <div className={styles.rescue}>
      <Link to="/rescue">
        <Button
          variant="secondary"
          onClick={() => {
            console.log("Rescue");
          }}
          className={styles.rescueBtn}
        >
          <Heart color="black" strokeWidth="1.2" fontSize={"1.8rem"} />
        </Button>
      </Link>
      <p>Rescue</p>
    </div>
  );
};

export const PostsContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();

  return (
    <div className={styles.postsContainer}>
      <div className={styles.sidebar}>
        {user?.role.includes("org") ? <CreatePost /> : <Rescue />}
      </div>
      <div className={styles.posts}>{children}</div>
    </div>
  );
};
