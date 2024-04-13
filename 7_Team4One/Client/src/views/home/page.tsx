import TwoColLayout from "@/components/layouts/twocol";
import PageHeader from "../../components/layouts/PageHeader/PageHeader";
import styles from "./Home.module.scss";
import cx from "classnames";
import { Post, PostsContainer } from "@/components/ui/Post";
import { useEffect, useState } from "react";
import { PostType } from "@/types/Post.type";
import getPosts from "@/utils/api/getPosts";
import eventEmitter from "@/config/eventEmitter.config";
import OrganizationList from "@/components/OrganizationList";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    const posts = await getPosts();
    if (posts) {
      setPosts(posts.posts);
    }
  };
  useEffect(() => {
    eventEmitter.on("postCreated", () => {
      fetchPosts();
    });

    fetchPosts();

    return () => {
      eventEmitter.off("postCreated");
    };
  }, []);

  return (
    <>
      <PageHeader bgImage="hero.png">
        <div className={cx(styles.header)}>
          <div className={styles["header-content"]}>
            <h1 className={styles.heading}>Live and let live</h1>
            <p>
              Detested by so many, yet these dogs nourish the hope for love and
              affection. I've met so many of them and felt the longing of their
              souls. My Dagi, who lived as a street dog in Portugal for many
              years, means everything to me. I don't even remember how days
              without her were!
            </p>
          </div>
        </div>
      </PageHeader>
      <div className="__page-content container">
        <TwoColLayout sidebar={<OrganizationList />}>
          <div>
            <PostsContainer>
              {posts.map((post) => (
                <Post
                  key={post.id}
                  description={post.description}
                  userName={post.first_name}
                  pictures={post.pictures}
                  userAvatar={post.avatar}
                  created_at={post.created_at}
                  post_type={post.post_type}
                />
              ))}
            </PostsContainer>
          </div>
        </TwoColLayout>
      </div>
    </>
  );
};

export default Home;
