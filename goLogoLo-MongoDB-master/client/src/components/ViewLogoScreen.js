import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
//import html2canvas from 'html2canvas';
//import Canvas2Image from '../canvas2image';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            lastUpdate
            backgroundColor
            borderWidth
            borderColor
            borderRadius
            padding
            margin
            height
            width
            imageURLList
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    exportToPNG = (e) => {
        console.log("EXPORT");
    }

    render() {
        //var URLArray = this.state.imageURLList.split(" ");
        //console.log(URLArray);
        var container = document.getElementById('createLogoDiv');

        //for (var i = 0, j = URLArray.length-1; i < j; i++) {
            var img = document.createElement('img');
            img.src = imageInput; // img[i] refers to the current URL.
            img.style.width = "50px";
            img.style.height = "50px";
            container.appendChild(img);
        //}
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    const styles = {
                        container: {
                            text: data.logo.text,
                            color: data.logo.color,
                            fontSize: data.logo.fontSize,
                            backgroundColor: data.logo.backgroundColor,
                            borderStyle: "solid",
                            borderWidth: data.logo.borderWidth,
                            borderColor: data.logo.borderColor,
                            borderRadius: data.logo.borderRadius,
                            padding: data.logo.padding,
                            margin: data.logo.margin,
                            height: data.logo.height,
                            width: data.logo.width,
                            imageURLList: data.logo.imageURLList,
                            position: "absolute",
                            textAlign: "center",
                            overflow: "auto",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                        }
                    }
                    
                    return (
                        <div className="customizeContainer" style={{float: "left", display: "inline-block", width: "274.84pt"}}>
                            <div className="panel panel-default" style={{float: "left"}}>
                                <div className="panel-heading">
                                    <h4><Link to="/"><button class="btn btn-primary btn-lg" type="submit" style={{backgroundColor: "#26a69a"}}>Go Back Home</button></Link></h4>
                                    <h3 className="panel-title" style={{color: "white", textAlign: "center", fontSize: "14pt", fontFamily: "Arial"}}>
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <dl style={{fontSize: "12pt", fontFamily: "Arial", color: "white"}}>
                                        <dt>Height:</dt>
                                        <dd>{data.logo.height}</dd>
                                        <dt>Width:</dt>
                                        <dd>{data.logo.width}</dd>
                                        <dt>Text:</dt>
                                        <dd>{data.logo.text.replace(/ /g, '\xa0')}</dd>
                                        <dt>ImageURLS:</dt>
                                        <dd style = {{overflowWrap : "anywhere"}}>{data.logo.imageURLList}</dd>
                                        <dt>Color:</dt>
                                        <dd>{data.logo.color}</dd>
                                        <dt>Font Size:</dt>
                                        <dd>{data.logo.fontSize}</dd>
                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                        <dt>Border Thickness:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </dl>
                                    <div style = {{width : "100%", textAlign: "center"}}>
                                    <div style = {{display : "inline-block"}}>
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                            {(removeLogo, { loading, error }) => (
                                                <div>
                                                    <form
                                                        onSubmit={e => {
                                                            e.preventDefault();
                                                            removeLogo({ variables: { id: data.logo._id } });
                                                        }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success btn-lg">Edit</Link>&nbsp;
                                                    <button type="submit" className="btn btn-danger btn-lg">Delete</button>&nbsp;
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                            )}
                                        </Mutation>
                                        </div>
                                        <div style = {{display : "inline-block"}}>
                                            <button id="buttonExport" className="btn btn-primary btn-lg" onClick= {this.exportToPNG.bind(this)} download="my-file-name.png">Export</button>&nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col s8" style = {{overflow : "auto", float: "left", display: "contents"}}>
                                <div id="exportDiv" style={ styles.container }>{data.logo.text.replace(/ /g, '\xa0')}<img src={data.logo.imageURL} id="imageURLIMG" alt=""></img></div>
                            </div>
                            <div className="col-91" style = {{float: "right"}}>
                                <canvas id="cnvs" class="canvas__canvas" style = {{position : "absolute", height : data.logo.height, width : data.logo.width}}></canvas>
                                <img src="" id="mirror" class="canvas__mirror" alt="" onerror="this.style.display='none'" style = {{position : "absolute", height : data.logo.height, width : data.logo.width}}/>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;