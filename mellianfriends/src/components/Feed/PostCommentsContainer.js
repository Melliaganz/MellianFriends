import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {
    getOneComment,
    getPostAllComments,
} from "../../_utils/comments/comments.function";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentsNotFound } from "../infos/NotFound"
import Comment from "./Comment";
import PostComment from "./postComment";


const PostCommentsContainer = ({ ...params}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [page, setPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [refetch, setRefetch] = useState(0);

    const fetchComment = () => {
        if (params.commentQuery === "getOneComment") {
            getOneComment(id).then(
                (res) => {
                    if (res.status === 200) {
                        res.json().then((result) => {
                            setComments(result);
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
                (error => {
                    setIsLoaded(true);
                    setError(error);
                })
            );
        }
    if (params.commentQuery === "getPostAllComments") {
        getPostAllComments(id, page).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then((result) => {
                        setComments([...comments, ...result.comments]);
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
    }
};
    useEffect(() => {
        fetchComment();
    }, [page, refetch]);
    const handleCommentPost = () => {
        setRefetch(( refetch) => refetch + 1);
        setPage((page) => {
            page = 0;
        });
        setComments(comments.splice(0, comments.length))
    }
    const handleErase = () => {
        setRefetch((refetch) => refetch +1);
        setPage((page) => {
            page = 0;
        });
        setIsLoaded(false);
    };
   if (error && error === 404){
    return (
        <div>
            <CommentsNotFound />
        </div>
    );
   } else if (error){
    return <div>Erreur: {error}</div>
   }else if (!isLoaded){
    return <div> Chargement... </div>;
   } else if (comments && params.commentQuery === "getOneComment") {
    return (
        <React.Fragment>
            <section>
                <div>
                    <Comment {...comments} onErase={handleErase} />
                </div>
            </section>
        </React.Fragment>
    )
   } else if(
    comments && comments.length > 0 &&
    (params.commentQuery === "getPostAllComments")
   ) {
    return (
        <React.Fragment>
            <InfiniteScroll
            dataLength={totalItems}
            next={()=> setPage(+1)}
            hasMore={true}>
                <section>
                    {comments.map((comment) => (
                        <React.Fragment key= {comment.id}>
                            <Comment {...comment} teaserComment={true}/>
                        </React.Fragment>
                    ))}
                </section>
            </InfiniteScroll>
        </React.Fragment>
    )
   } else {
    return (
        <React.Fragment>
            {params.postComment ? <PostComment onPost={handleCommentPost} /> : null}
            <div> Aucun Commentaires</div>
        </React.Fragment>
    )
   }
}
export default PostCommentsContainer;