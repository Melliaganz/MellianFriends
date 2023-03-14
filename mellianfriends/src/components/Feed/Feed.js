import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getOnePost,
  getAllUserPosts,
  getPosts
} from "../../_utils/posts/posts.functions"
import InfiniteScroll from "react-infinite-scroll-component";
import { NoPostFound } from '../infos/NotFound';
import FeedPost from './FeedPost';
import FeedContent from './FeedContent';
import Rightbar from '../Rightbar/Rightbar';
import PostCommentsContainer from "./PostCommentsContainer"
import PostComment from './postComment';

const Feed = ({...params}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  let { id } = useParams();
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [refetch, setRefetch] = useState(0);
  const [comments, setComments] = useState([]);

  const fetchPost = () => {
    if (params.postQuery === "getPosts"){
      getPosts(page).then(
        (res) => {
          if (res.status === 200) {
            res.json().then((result) => {
              setPosts([ ...posts, ...result.posts]);
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
        (error) =>{
          setError(error);
          setIsLoaded(true);
        }
      );
    }
    if (params.postQuery === "getOnePost") {
      getOnePost(id).then(
        (res) => {
          if(res.status === 200) {
            res.json().then((result) => {
              setPosts(result);
              setIsLoaded(true);
            })
          } else if (res.status === 404) {
            setError(404);
            setIsLoaded(true)
          } else {
            setError(res.statusText);
            setIsLoaded(true);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    }
    if (params.postQuery === "getAllUserPosts") {
      getAllUserPosts(id, page).then(
        (res) => {
          if (res.status === 200) {
            res.json().then((result) =>  {
            setPosts([ ...posts, ...result.posts]);
            setTotalItems(result.totalItems);
            console.log(result);
            setIsLoaded(true)
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
    )
    }
  }
  useEffect(() => {
    fetchPost();
  }, [page, refetch])

  const handlePost = () => {
    setRefetch((refetch) => refetch + 1);
    setPage((page) => {
      page = 0;
    });
    setPosts(posts.splice(0, posts.length));
  }
  const handleCommentPost = () => {
    setRefetch((refetch) => refetch + 1);
    setPage((page) => {
      page= 0;
    });
    setComments(comments.splice(0, comments.length));
  }

  const handleErase = () => {
    setRefetch((refetch) => refetch + 1);
    setPage((page) => {
      page = 0;
    });
    setIsLoaded(false);
    
  };

  if(error && error === 404) {
    return (
      <div>
        <NoPostFound />
      </div>
    );
  } else if (error) {
    return <div>Erreur : {error} </div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else if (posts && params.postQuery === "getOnePost") {
    return (
      <React.Fragment>
        <section className='feedPostContainer'>
          <div className=''>
            <FeedContent {...posts} onErase={handleErase} />
          </div>
          <div><PostComment /></div>
          <div className='commentairesContainer'><PostCommentsContainer onPost={handleCommentPost} commentQuery="getPostAllComments"/> </div>
        </section>
      </React.Fragment>
    )
  } else if (
    posts &&
    posts.length > 0 &&
    (params.postQuery === "getAllUserPosts") |
    (params.postQuery === "getPosts")
  ) {
  return (
  <React.Fragment>
    <div className='rightbar'>
    <Rightbar />
    </div>
    {params.createPost ? <div className='feedPostContainer' ><FeedPost onPost={handlePost} /></div> : null}
    <InfiniteScroll
    dataLength={totalItems}
    next={() => setPage(+1)}
    hasMore={true}
    >
      <section className='feedPosition'>
        {posts.map((post) => (
          <div className='feedContentContainer'>
          <React.Fragment key={post.id}>
            <FeedContent {...post} teaserPost={true} />
          </React.Fragment>
          </div>
        ))}
      </section>
    </InfiniteScroll>
  </React.Fragment>
    
    );
    
  } else {
    return (
      <React.Fragment>
        {params.createPost ? <div className='feedPostContainer'><FeedPost onPost={handlePost} /></div> : null}
        <div><NoPostFound /></div>
      </React.Fragment>
    )
  }
}

export default Feed