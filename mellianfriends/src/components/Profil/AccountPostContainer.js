import React, { useState, useEffect } from "react";
import Post from "../Feed/FeedContent";
import { useParams } from "react-router-dom";
import { getAllUserPosts } from "../../_utils/posts/posts.functions";
import { NoPostFound } from "../infos/NotFound";
import InfiniteScroll from "react-infinite-scroll-component";
import Friends from "./Friends"
import Intro from "./Intro"
import Photos from "./Photos"
import Copyright from "./Copyright";

const AccountPostsContainer = ({ ...params }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [refetch, setRefetch] = useState(0);

  const fetchPost = () => {
    getAllUserPosts(id, page).then(
      (res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            setPosts([...posts, ...result.posts]);
            setTotalItems(result.totalItems);
            console.log(result);
            setIsLoaded(true);
          });
        } else if (res.status === 404) {
          setError(404);
          setIsLoaded(true);
        } else {
          setError(res.statusText);
          setIsLoaded(true);
        }
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      }
    );
  };

  useEffect(() => {
    fetchPost();
  }, [page, refetch]);

  const handleErase = () => {
    setRefetch((refetch) => refetch + 1);
    setPage((page) => {
      page = 0;
    });
    setPosts( posts => posts = []);
    setIsLoaded((isLoaded) => isLoaded = false);
    
  };

  if (error && error === 404) {
    return (
      <div>
        <NoPostFound />
      </div>
    );
  } else if (error) {
    return <div>Erreur : {error}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  }  else if (
    posts &&
    posts.length > 0 
  ) {
    return (
      <React.Fragment>
        <InfiniteScroll
          dataLength={totalItems}
          next={() => setPage(+1)}
          hasMore={true}
        >
          <section className="feedPosition2">
          <div className="leftBarContainer">
          <div className="intro">
            <Intro />
          </div>
        <div className="friendsListProfile">
          <Friends />
        </div>
        <div className="photosListContainer">
          <Photos />
        </div>
        <div className="copyright">
          <Copyright />
        </div>
        </div>
        <div className="feedContentContainer2">
            {posts.map((post) => (
              <React.Fragment key={post.id}>
                  <Post {...post} teaserPost={true} onErase={handleErase} />
              </React.Fragment>
            ))}
            </div>
          </section>
        </InfiniteScroll>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="">Aucun post</div>
      </React.Fragment>
    );
  }
};
export default AccountPostsContainer;