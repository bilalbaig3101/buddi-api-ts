import * as React from "react";
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import CodeSnippet from './Components/CodeSnippet';
import CustomButton from './Components/CustomButton';
import ResponseRegion from './Components/ResponseRegion';
import Textbox from './Components/Textbox';
import './Styles/App.css';

interface AppState {
  isDark: boolean,
  regions: string | null,
  urls: string | null,
  legacyUrls: string | null,
  urlObj: {
    tag: string,
    region: string
  },
  legacyUrlObj: {
    tag: string,
    region: string
  }
}

class App extends React.Component<{}, AppState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      isDark: false,
      regions: null,
      urls: null,
      legacyUrls: null,
      urlObj: {
        tag: "",
        region: ""
      },
      legacyUrlObj: {
        tag: "",
        region: ""
      }
    }
  }
  public componentWillMount(){
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkTheme) {
      this.setState({ isDark: true })
    }
  }
  private toogleTheme = () => {
    const theme = !(this.state.isDark);
    this.setState({
      isDark: theme
    })
  }
  private getRegions = async () => {
    try {
      const response: any = await axios.get(`https://buddi.bentley.com/WebService/GetRegions`);
      const dataString: string = JSON.stringify(response, null, 2);
      this.setState({
        regions: dataString
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  private getUrls = async () => {
    try {
      const { tag, region } = this.state.urlObj;
      const response: any = await axios.get(`https://buddi.bentley.com/WebService/GetURL?url=${tag}&region=${region}`);
      const dataString: string = JSON.stringify(response, null, 2);
      this.setState({
        urls: dataString
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  private getLegacyUrls = async () => {
    try {
      const { tag, region } = this.state.legacyUrlObj
      const response: any = await axios.get(`https://buddi.bentley.com/WebService/GetURL?urlName=${tag}&regionId=${region}`);
      const dataString: string = JSON.stringify(response, null, 2);
      this.setState({
        legacyUrls: dataString
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  private onchangeHandlerURL = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value }: any = e.target;
    console.log(value)
    this.setState(pervState => ({
      urlObj: { ...pervState.urlObj, [id]: value }
    }))
  }
  private onchangeHandlerLegacy = (e: React.FormEvent<HTMLInputElement>) => {
    const { id, value }: any = e.target;
    this.setState(pervState => ({
      legacyUrlObj: { ...pervState.legacyUrlObj, [id]: value }
    }));
  }
  render() {
    const GlobalStyle = createGlobalStyle`
      body{
          background-color: ${this.state.isDark ? '#222831' : '#F8F9FB'};
          color: ${this.state.isDark ? '#ececec' : '#002A44'};
          transition-duration: 700ms;
      }
      .response-area{
          background-color: ${this.state.isDark ? '#30475e' : '#FFF'};
          transition-duration: 700ms
      }`;
    return (
      <>
      <GlobalStyle/>
        <div className="App">
          <CustomButton onClickHandler={this.toogleTheme} text={`Switch to ${this.state.isDark ? ("🌞") : ("🌛")}`} />
          <h1>Buddi Api {this.state.isDark ? ("🌛") : ("🌞")}</h1>
          <p>The following is a description of available REST
        endpoints for the BUDDI API. <br />
        Base URL for JSON requets: <CodeSnippet text="/WebService" />
          </p>
          <h2>1. GetRegions</h2>
          <ul>
            <li>Returns the list of Regions.</li>
            <li>JSON: <CodeSnippet text="GET /GetRegions" /></li>
          </ul>
          <CustomButton text="Test GET" onClickHandler={this.getRegions} />
          <ResponseRegion data={this.state.regions} />
          <h2>2. GetURL (Dynamic)</h2>
          <ul>
            <li>Returns a URL.</li>
            <li>Paramenters must be specified in the URL as encoded parameters.</li>
            <li>JSON: <CodeSnippet text="GET /GetURL?=<url_name_or_id>&resion=<region_name_or_id>" /></li>
          </ul>
          <div>
            <h4 style={{ display: 'inline', marginRight: '10px' }}>url</h4>
            <Textbox id="tag" value={this.state.urlObj.tag}
              placeholder="URL Name or ID" handleOnChange={this.onchangeHandlerURL} />
            <h4 style={{
              display: 'inline', marginRight: '10px',
              marginLeft: '10px'
            }}>region</h4>
            <Textbox id="region" value={this.state.urlObj.region}
              placeholder="Region Name or ID" handleOnChange={this.onchangeHandlerURL} />
            <CustomButton text="Test GET" onClickHandler={this.getUrls} />
            <ResponseRegion data={this.state.urls} />
          </div>
          <h2>3. GetURL (Legacy)</h2>
          <ul>
            <li>Returns a URL.</li>
            <li>Paramenters must be specified in the URL as encoded parameters.</li>
            <li>JSON: <CodeSnippet text="GET /GetURL?urlName=<url_name>&regionId=<regionId>" /></li>
          </ul>
          <div>
            <h4 style={{ display: 'inline', marginRight: '10px' }}>urlName</h4>
            <Textbox id="tag" value={this.state.legacyUrlObj.tag}
              placeholder="URL Name" handleOnChange={this.onchangeHandlerLegacy} />
            <h4 style={{
              display: 'inline', marginRight: '10px',
              marginLeft: '10px'
            }}>regionId</h4>
            <Textbox id="region" value={this.state.legacyUrlObj.region}
              placeholder="Region ID" handleOnChange={this.onchangeHandlerLegacy} />
            <CustomButton text="Test GET" onClickHandler={this.getLegacyUrls} />
            <ResponseRegion data={this.state.legacyUrls} />
          </div>
        </div>
      </>
    )
  }
}

export default App;
