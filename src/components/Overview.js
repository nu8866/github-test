import React, { Component } from "react";
import { getRepos, getUserData } from "../utils/github-api";
import "semantic-ui-css/semantic.min.css";
import {
  Input,
  Button,
  Segment,
  Divider,
  Tab,
  Icon,
  Menu,
  Label,
} from "semantic-ui-react";
import "./Overview.css";
import { Repositories } from "./Repositories";
import { Orgs } from "./Orgs";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      userData: {},
      repos: [],
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.getPanes = this.getPanes.bind(this);
  }

  onClickHandler(e) {
    getUserData(this.state.input)
      .catch((error) => alert("Server side error!"))
      .then((result) =>
        this.setState({ userData: result }, () =>
          console.log("userData:", this.state.userData)
        )
      );
    getRepos(this.state.input)
      .catch((error) => alert("Server side error!"))
      .then((result) =>
        this.setState({ repos: result }, () =>
          console.log("repos: ", this.state.repos)
        )
      );
  }
  getPanes() {
    let panes = [];
    if (this.state.repos.length > 0) {
      let paneRepo = {
        menuItem: (
          <Menu.Item>
            Repositories <Label color="teal">{this.state.repos.length}</Label>
          </Menu.Item>
        ),
        // menuItem: "Repositories",
        render: () => <Tab.Pane>{Repositories(this.state.repos)}</Tab.Pane>,
      };
      panes.push(paneRepo);
      console.log(panes);
    }
    if (this.state.userData.orgs) {
      let paneOrg = {
        //menuItem: "Organisations",
        menuItem: (
          <Menu.Item>
            Organisations
            <Label color="teal">{this.state.userData.orgs.length}</Label>
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{Orgs(this.state.userData.orgs)}</Tab.Pane>,
      };
      panes.push(paneOrg);
    }
    return panes;
  }
  render() {
    return (
      <div className="Overview">
        <h1>
          Welcome to my first Github repo!
          <Icon name="github" />
        </h1>
        <div className="SearchBar">
          <div className="Action">
            <Input
              placeholder="Github user account"
              size="big"
              onChange={(e) => {
                this.setState({ input: e.target.value });
              }}
              onKeyUp={(e) => {
                if (e.keyCode === 13) this.onClickHandler(e);
              }}
            ></Input>
            <Button onClick={this.onClickHandler} className="Search" primary>
              Search
            </Button>
          </div>
          {this.state.userData.user && (
            <Segment>
              <div className="UserInfo">
                <img src={this.state.userData.user.avatar_url} alt="User Img" />
                <Divider />
                <div className="Details">
                  <span>
                    <Icon name="user" /> {this.state.userData.user.name}
                  </span>
                  <span>
                    <Icon name="suitcase" /> {this.state.userData.user.company}
                  </span>
                  <span>
                    <Icon name="map marker alternate" />
                    {this.state.userData.user.location}
                  </span>
                </div>
              </div>
            </Segment>
          )}
        </div>
        {(this.state.repos.length > 0 || !!this.state.userData.orgs) && (
          <React.Fragment>
            <Divider />
            <div className="Info">
              <Tab panes={this.getPanes()} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Overview;
