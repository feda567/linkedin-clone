
import PostModal from "./PostModal";
import { useState,useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";
import fuzzyTime from "fuzzy-time";
import { db } from "../firebase";
import {updateDoc,doc} from "firebase/firestore";
import Comment from "./Comment";
import {
  Container,
  ShareBox,
  Article,
  SharedActor,
  Description,
  SharedImg,
  SocialCounts,
  SocialActions,
  Content
} from './StyleMain';

const Main = (props) => {
  const [showModal,setShowModal]=useState("close");
  const [showComments, setShowComments] = useState([]);

  useEffect(()=>{
    props.getArticles();
  },[]);

  const fetchLikes = (articleId, likes) => {
    const user = props.user;
  if (!user|| !user.email) {
    // User is not available, handle the error or return
    return;
  }
    const updatedLikes = likes.some((l) => l.email === props.user.email)
      ? likes.filter((l) => l.email !== props.user.email)
      : [
          { name: props.user.displayName, email: props.user.email, photo: props.user.photoURL },
          ...likes,
        ];
  
    // Update the likes in the database or API
    updateDoc(doc(db, "articles", articleId), {
      likes: updatedLikes,
    });
  };


  const handleClick=(e)=>{
    e.preventDefault();
    if(e.target!==e.currentTarget){
      return;
    }


    switch(showModal){
      case "open":
        setShowModal("close");
        break;
      case "close":
          setShowModal("open");
          break;
      default:
        setShowModal("close");
        break;
        
    }
  }
  return (
  <>
  <Container>
    <ShareBox>
      <div>
      { props.user && props.user.photoURL ? (
      <img src={props.user.photoURL}/>
      ):(
      <img src="/images/user.svg" alt=""/>      
      )}
        <button onClick={handleClick}
        disabled={props.loading ? true:false}>
          Start a post
          </button>
      </div>
      <div>
        <button>
          <img src="/images/photo-icon.svg" alt=""/>
          <span onClick={handleClick}
            disabled={props.loading ? true:false}>
               Photo
          </span>
        </button>
        <button>
          <img src="/images/video-icon.svg" alt=""/>
          <span onClick={handleClick}
             disabled={props.loading ? true:false}>
              Video
          </span>
        </button>
        <button>
          <img src="/images/event-icon.svg" alt=""/>
          <span>Event</span>
        </button>
        <button>
          <img src="/images/article-icon.svg" alt=""/>
          <span> Write Article</span>
        </button>
      </div>
      </ShareBox>
      <Content>
      {
        props.loading && <img src='./images/spin-loader.svg'/>
      }
      {props.articles.length>0 &&
    props.articles.map((article,key)=>(
      <Article key={key}>
        <SharedActor>
          <a>
            <img src={article.actor.image} alt=""/>
            <div>
              <span>{article.actor.title}</span>
              <span>{article.actor.description}</span>
              <span>{fuzzyTime(article.actor.date)}</span>
            </div>
          </a>
          </SharedActor>
          <Description>
          {article.description}
          </Description>
          <SharedImg>
          <a>
              {
                !article.shareImg && article.video ? (<ReactPlayer width={'100%'} url={article.video} controls={true} />
                ):(
                  article.shareImg && <img src={article.shareImg}/>
                )
              }
            </a>
          </SharedImg>
          <SocialCounts>
          <li>
                {article.likes.length > 0 && (
                  <img
                    src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                    alt="likes"
                  />
                )}
                <span>
                  {article.likes.length} {article.likes.length === 1 ? " like • " : " likes •"}
                </span>
              </li>
              <li onClick={() => setShowComments((prev) => [...prev, article.id])}>
              <p className="comments">
                {article.comments ? (article.comments.length === 1 ? '1 comment' : `${article.comments.length} comments`) : '0 comments'}
              </p>

              </li>
          </SocialCounts>
          <SocialActions>
          <button
                className={
                  article.likes.some((l) => l.email === props.user.email) ? "active" : ""
                }
                onClick={(e) => {
                  fetchLikes(article.id, article.likes);
                }}
              >
                <img className="unLiked" src="/images/like.svg" alt="like" />
                <img
                  className="liked"
                  src="https://static-exp1.licdn.com/sc/h/5zhd32fqi5pxwzsz78iui643e"
                  alt="like"
                />
            <span>Like</span>
          </button>
          <button onClick={() => setShowComments((prev) => [...prev, article.id])}>
            <img src="/images/comments-icon.svg" alt=""/>
            <span>Comments</span>
          </button>
          <button>
            <img src="/images/share-icon.svg" alt=""/>
            <span>Share</span>
          </button>
          <button>
            <img src="/images/send-icon.svg" alt=""/>
            <span>Send</span>
          </button>
          
          </SocialActions>
          {showComments.includes(article.id) && (
              <Comment
                photo={props.user?.photoURL}
                comments={article.comments}
                user={props.user}
                id={article.id}
              />
            )}
      </Article>
    ))}
      </Content>
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
    </>
    );
};


const mapStateToProps=(state)=>{
  return{
    loading:state.articleState.loading,
    user:state.userState.user,
    articles:state.articleState.articles.map((article)=>({
      ...article,
      id:state.articleState.articles.find((a)=>a.id===article.id)
      .id,
    })),
    articleIDs: state.articleState.articles.map((article) => article.id),
  };
};
const mapDispatchToProps=(dispatch)=>({
      getArticles:()=>dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps,mapDispatchToProps)(Main);