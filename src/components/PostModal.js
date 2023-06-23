
import { useState } from "react";
import ReactPlayer from "react-player";
import {connect} from 'react-redux';
import {postArticleAPI} from '../actions';
import 'firebase/compat/firestore';
import {
    Container,
    Content,
    Header,
    ShareContent,
    UserInfo,
    ShareCreation,
    AssetButton,
    AttachAssets,
    ShareComment,
    PostButton,
    Editor,
    UploadImage
} from './StylePostModal';


const PostModal = (props) => {
    const [editorText,setEditorText]=useState("");
    const [shareImage,setShareImage]=useState("");
    const [videoLink,setVideoLink]=useState("");
    const [assetArea,setAssetArea]=useState("");

    const handleChange=(e)=>{
        const image=e.target.files[0];

        if(image=== '' ||image ===undefined){
            alert(`not an image,the file is a ${typeof(image)}`);
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea=(area)=>{
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    };
    const postArticle=(e)=>{
        console.log('post malone:r');
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }
        const payload={
            image:shareImage,
            video:videoLink,
            user:props.user,
            description:editorText,
            timestamp : Date.now(),
        };
        props.postArticle(payload);
        reset(e);
    };

    const reset=(e)=>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };

    return (  
        <>
        {props.showModal==='open' &&
        <Container>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={(event)=>reset(event)}>
                        <img src="/images/close-icon.svg" alt=""/>
                    </button>
                </Header>
                <ShareContent>
                    <UserInfo>
                        {props.user.photoURL ? (<img src={props.user.photoURL}/>)
                        :(<img src="/images/user.svg" alt=""/>)
                        }
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                    <textarea 
                    value={editorText}
                    onChange={(e)=>setEditorText(e.target.value)}
                    placeholder="what do you want to talk about?"
                    autoFocus={true} 
                    />

                    { assetArea==='image' ?

                    <UploadImage>
                        <input type="file" 
                        accept='image/gif ,image/jpeg ,image/png'
                        name="image"
                        id="file"
                        style={{display:"none"}}
                        onChange={handleChange} 
                        />
                        <p>
                            <label htmlFor="file">
                            Select an image to share</label>
                        </p>
                        {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                        </UploadImage>
                        :
                        assetArea==='media' &&
                        <>
                        <input type="text" 
                        placeholder='Please input a video link'
                        value={videoLink}
                        onChange={(e)=>setVideoLink(e.target.value)}
                        />
                        {videoLink && (
                        <ReactPlayer width={'100%'} url={videoLink} controls={true}/>
                        )}
                        </>
                    }
                    
                    </Editor>
                </ShareContent>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton onClick={()=>switchAssetArea("image")}>
                            <img src="/images/photo-icon.svg" className="postimg" alt=""/>
                        </AssetButton>
                        <AssetButton onClick={()=>switchAssetArea("media")}>
                            <img src="/images/video-icon.svg" className="postvid" alt=""/>
                        </AssetButton>
                    </AttachAssets>
                    <PostButton disabled={!editorText ? true : false} 
                    onClick={(event)=>postArticle(event)}
                    >
                        Post
                    </PostButton>

                </ShareCreation>
            </Content>
        </Container>
}
        </>
    );
}
 

const mapStateToProps=(state)=>{
    return{
        user:state.userState.user,
    }
};

const mapDispatchToProps=(dispatch)=>({
    postArticle:(payload)=>dispatch(postArticleAPI(payload)),
});
export default connect(mapStateToProps,mapDispatchToProps)(PostModal);