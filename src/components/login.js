import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import BottomNav from './bottom-nav';
import HouseOne from '../img/house-one.jpg';
import HouseTwo from '../img/house-two.jpeg';
import HouseThree from '../img/house-three.jpg';

const Login = (props) => { // sort out the buttons
  return (
    <div className="top-bar-middle">
      <div className="header"> <div id="sublit-title">Sublit</div>
        <div className="flex-btn">

          <NavLink to="/signin" className="login-btn">
            <div className="navlink">Sign In    </div>
          </NavLink>
          <NavLink to="/signup" className="login-btn">
            <div className="navlink">
              Sign Up
            </div>
          </NavLink>
        </div>

      </div>
      {/* <div className="row-flex">
        <div className="middle-oval" id="oval-three">
          <p className="create-txt">
            Create your free account today!
          </p>
        </div>
      </div> */}
      <div className="middle-section">
        <div className="row-flex">
          <div className="row-flex">
            <div className="rectangle" />
            <div className="middle-oval" id="oval-one">
              <p>
                Are you looking for off-campus housing?
              </p>
              <p>
                For 1, 2, or 3 trimesters or even the year?
              </p>
              <p>
                Welcome to Sublit, where you can find off campus housing options around Dartmouth for any term!
              </p>
            </div>
          </div>
          <div className="row-flex">
            <div className="rectangle" />
            <div className="middle-oval" id="oval-two">
              <p>
                Looking to sublet your off-campus place?
              </p>
              <p>
                With SubLit, you can add your room, house, or apartment as a listing and get chatting with potential buyers!
              </p>
            </div>
          </div>
        </div>

      </div>
      <div className="middle-section-row">
        <div className="img-flex">
          <Card>
            <CardMedia component="img" image={HouseOne} alt="house text" className="house" />
            <CardContent className="img-text">
              Beautiful home in Hanover, NH up for lease!
            </CardContent>
          </Card>
        </div>
        <div className="img-flex">
          <Card>
            <CardMedia component="img" image={HouseTwo} alt="house text" className="house" />
            <CardContent className="img-text">
              Beautiful home in Hanover, NH up for lease!
            </CardContent>
          </Card>
        </div>
        <div className="img-flex">
          <Card>
            <CardMedia component="img" image={HouseThree} alt="house text" className="house" />
            <CardContent className="img-text">
              Beautiful home in Hanover, NH up for lease!
            </CardContent>
          </Card>

        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default connect(null, { })(Login);
