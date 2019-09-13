import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, Tab, Grid, Cell, Card, CardTitle, CardActions, CardMenu, Button, IconButton, CardText } from 'react-mdl';

import aboutProject1 from './Projects/aboutProject1.js';
import aboutProject2 from './Projects/aboutProject2';
import aboutProject3 from './Projects/aboutProject3';

class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = { activeTab: 0 };
    }

    toggleCategories() {

        if(this.state.activeTab === 0) {
            return (
                <Router>
                <div className="projects-grid">
                    {/*Project 1*/}
                <Card shadow={5} style={{mindWidth: '450', margin: 'auto'}}>
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://www.reviewjournal.com/wp-content/uploads/2019/07/12407901_web1_bally_paris_planethollywood_web.jpg) center / cover'}}></CardTitle>
                    <CardText>
                        Las Vegas hotel room application
                    </CardText>
                    <CardActions border>
                        <Button colored href="https://github.com/nrodriguez04/react-las-vegas-resorts">GitHub</Button>
                        <Link to="/project1">About</Link>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>

                    {/*Project 2*/}
                <Card shadow={5} style={{mindWidth: '450', margin: 'auto'}}>
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://pinchofyum.com/wp-content/uploads/Top25Recipes-01.png) center / cover'}}></CardTitle>
                    <CardText>
                        Recipe App
                    </CardText>
                    <CardActions border>
                        <Button colored href="https://github.com/nrodriguez04/react-recipe-app" target="_blank">GitHub</Button>
                        <Link to="/project2">About</Link>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>

                {/*Project 3*/}
                <Card shadow={5} style={{mindWidth: '450', margin: 'auto'}}>
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://miro.medium.com/max/2560/0*74DpOmQGc2sgrfWg.jpg) center / cover'}}></CardTitle>
                    <CardText>
                        React version of Tetris
                    </CardText>
                    <CardActions border>
                        <Button colored href="https://github.com/nrodriguez04/react-tetris" target="_blank">GitHub</Button>
                        <Link to="/project3">About</Link>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>
                </div>

                <Route path="/project1" component={aboutProject1} />
                <Route path="/project2" component={aboutProject2} />
                <Route path="/project3" component={aboutProject3} />
                </Router>
            )
        } else if(this.state.activeTab === 1) {
            return(
                <div className="projects-grid">
                    {/*Project 1*/}
                    <Card shadow={5} style={{mindWidth: '450', margin: 'auto'}}>
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://quantizd.com/wp-content/uploads/2018/05/React-Native-Reddit.png) center / cover'}}>React Native 1</CardTitle>
                    <CardText>
                        Lorem Ipsum
                    </CardText>
                    <CardActions border>
                        <Button colored>GitHub</Button>
                        <Button colored>Live Demo</Button>
                        <Button colored>About</Button>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>

                    {/*Project 2*/}
                <Card shadow={5} style={{mindWidth: '450', margin: 'auto'}}>
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://quantizd.com/wp-content/uploads/2018/05/React-Native-Reddit.png) center / cover'}}>React Native 2</CardTitle>
                    <CardText>
                        Lorem Ipsum
                    </CardText>
                    <CardActions border>
                        <Button colored>GitHub</Button>
                        <Button colored>Live Demo</Button>
                        <Button colored>About</Button>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>

                    {/*Project 3*/}
                <Card shadow={5} style={{mindWidth: '450', margin: 'auto'}}>
                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://quantizd.com/wp-content/uploads/2018/05/React-Native-Reddit.png) center / cover'}}>React Native 3</CardTitle>
                    <CardText>
                        Lorem Ipsum
                    </CardText>
                    <CardActions border>
                        <Button colored>GitHub</Button>
                        <Button colored>Live Demo</Button>
                        <Button colored>About</Button>
                    </CardActions>
                    <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>
                </div>
            )
        } else if(this.state.activeTab === 2) {
            return (
                <div className ="projects-grid">
                                    {/*Project 3*/}
                                    <Card shadow={5} style={{mindWidth: '450', margin: 'auto'}}>
                                    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://img2.10bestmedia.com/Images/Photos/319733/p-Old-Range-Steakhouse-Tahoe_54_990x660.jpg) center / cover'}}></CardTitle>
                                    <CardText>
                                        Restaurant Website
                                    </CardText>
                                    <CardActions border>
                                        <Button colored>GitHub</Button>
                                        <Button colored>Live Demo</Button>
                                    </CardActions>
                                    <CardMenu style={{color: '#fff'}}>
                                        <IconButton name="share" />
                                    </CardMenu>
                                </Card>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="category-tabs">
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab>React</Tab>
                    {/*<Tab>React Native</Tab>*/}
                    {/*<Tab>Node</Tab>*/}
                </Tabs>


                    <Grid>
                        <Cell col={12}>
                            <div className="content">{this.toggleCategories()}</div>
                        </Cell>
                    </Grid>
            </div>    
        );
}
}

export default Projects;