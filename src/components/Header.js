
import {connect} from 'react-redux';
import { signOutAPI } from '../actions';
import {
  Container,
Content,
Logo,
Search,
SearchIcon,
Nav,
NavListWrap,
NavList,
SignOut,
User,
Work
} from './StyleHeader';
const Header = (props) => {

  const handleSignOut = () => {
    props.signOut(); // Dispatch the signOut action
  };
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a>
                <img src="/images/nav-home.svg" alt="" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-network.svg" alt="" />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-jobs.svg" alt="" />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-notifications.svg" alt="" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>               
                {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt=""/>

                
                ):(<img src="/images/user.svg" alt="" /> 
              )}                
                <span>
                  Me
                <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>

              <SignOut>
          <a onClick={handleSignOut}>Sign Out</a>
        </SignOut>
            </User>

            <Work>
              <a>
                <img src="/images/nav-work.svg" alt="" />
                <span>
                  Work
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};



const mapStateToProps=(state)=>{
  return{
    user:state.userState.user,
  };
}

const mapDispatchToProps=(dispatch)=>({
  signOut:()=>dispatch(signOutAPI()),
});
export default connect(mapStateToProps,mapDispatchToProps)(Header);