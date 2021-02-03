import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Loading from "./../../components/Loading/Loading";
import "./feed.css";
import { ReactComponent as Applaud } from "./applaud.svg";
import { ReactComponent as Comment } from "./comment.svg";

const NAME_QUERY = gql`
  query {
    user(login: "ankiiitraj") {
      name
      login
      avatarUrl
      followers {
        totalCount
      }
      bio
    }
  }
`;

const Post = ({ user, content }) => {
  return (
    <>
      <div className="feed-post-wrapper">
        <div className="feed-post-meta">
          <img className="feed-post-avtar" src={user.avatarUrl} />
          <div className="feed-post-user">
            <strong>{user.login}</strong>
            <div style={{ color: "#00000099" }}>{user.bio}</div>
            <div style={{ color: "#00000099" }}>
              {user.followers.totalCount} Followers
            </div>
          </div>
        </div>
        <div className="feed-post-main">{content}</div>

        <div className="feed-post-actions">
          <Link to="#" style={{ color: "#00000099" }}>
            <div className="feed-post-action">
              <div className="feed-post-icon">
                <Applaud width={20} height={20} />
              </div>
              <div>Applaud </div>
            </div>
          </Link>
          <Link to="#" style={{ color: "#00000099" }}>
            <div className="feed-post-action">
              <div className="feed-post-icon">
                <Comment width={20} height={20} />
              </div>
              <div>Comment </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

const Feed = () => {
  const { loading, error, data } = useQuery(NAME_QUERY);
  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  return (
    <div className="feed-wrapper">
      <div className="feed-main">
        <Post
          user={data.user}
          content={
            "I'm a noobie trying to contribute to Deno WASM tests, if anyone can provide guidance it'll be great! Thanks!"
          }
        />
        <Post
          user={data.user}
          content={
            "I'm a noobie trying to contribute to Deno WASM tests, if anyone can provide guidance it'll be great! Thanks!"
          }
        />
        <Post
          user={data.user}
          content={
            "I'm a noobie trying to contribute to Deno WASM tests, if anyone can provide guidance it'll be great! Thanks!"
          }
        />
        <Post
          user={data.user}
          content={
            "I'm a noobie trying to contribute to Deno WASM tests, if anyone can provide guidance it'll be great! Thanks!"
          }
        />
        <Post
          user={data.user}
          content={
            "I'm a noobie trying to contribute to Deno WASM tests, if anyone can provide guidance it'll be great! Thanks!"
          }
        />
      </div>
    </div>
  );
};

export default Feed;
