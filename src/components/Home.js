
import Header from "./Header";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { Navigate } from "react-router-dom";
import {connect} from "react-redux";
import {
  Container,
Section,
Layout
} from './StyleHome';
const Home = (props) => {
  return (
   
    <Container>
      {!props.user && <Navigate to='/'/>}
      <Section>
        <h5>
          <a>Hiring in a hurry? - </a>
        </h5>
        <p>
          Find talented pros in record time with Upwork and keep business
          moving.
        </p>
      </Section>
      <Layout>
      <Header />
        <Leftside />
        <Main />
        <Rightside />
      </Layout>
    </Container>
    
  );
};



const mapStateToProps=(state)=>{
  return{
    user:state.userState.user,
  };
};
export default connect(mapStateToProps)(Home);