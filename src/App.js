import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Header, Navigation, Drawer, Content, Button } from 'react-mdl';
import './App.css';
import Main from './components/main';
import Logo from '../src/components/images/landingLogo.png'

function App() {
  return (
<div style={{height: '100vh', position: 'relative'}}>
    <Layout fixedHeader>
        <Header className="header-color" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/"><img className="landing-logo" src={Logo} alt="logo" /></Link>} scroll>
            <Navigation>
                <Link to="/projects">Projects</Link>
                <Link to="/aboutme">About Me</Link>
                <Link to="/contact">Contact</Link>
            </Navigation>
          </Header>
        <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to="/">Welcome</Link>}>
            <Navigation>
                <Link to="/projects">Projects</Link>
                <Link to="/aboutme">About Me</Link>
                <Link to="/contact">Contact</Link>
            </Navigation>
            <Button raised accent ripple className="source-button" href="https://github.com/nrodriguez04/portfolio.git" target="_blank">Source</Button>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main />
        </Content>
    </Layout>
</div>

  );
}

export default App;
