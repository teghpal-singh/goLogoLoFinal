import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderWidth: Int!,
        $borderColor: String!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,
        $height: Int!,
        $width: Int!,
        $imageURLList: String!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderWidth: $borderWidth,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin,
            height: $height,
            width: $width,
            imageURLList: $imageURLList) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    state = {
        text: "Default Logo",
        id: "",
        color: "black",
        fontSize: "14pt",
        backgroundColor: "white",
        borderStyle: "solid",
        borderWidth: "1pt",
        borderColor: "black",
        borderRadius: "1pt",
        padding: "1pt",
        margin: "1pt",
        height: "30pt",
        width: "80pt",
        imageURLList: ""
    }

    updateText = (e) => {
        this.setState({text: e.target.value})
    }

    updateColor = (e) => {
        this.setState({color: e.target.value})
    }

    updateFontSize = (e) => {
        this.setState({fontSize: parseInt(e.target.value) + "pt"})
    }

    updateBackgroundColor = (e) => {
        this.setState({backgroundColor: e.target.value})
    }

    updateBorderWidth = (e) => {
        this.setState({borderWidth: parseInt(e.target.value)})
    }

    updateBorderColor = (e) => {
        this.setState({borderColor: e.target.value})
    }

    updateBorderRadius = (e) => {
        this.setState({borderRadius: parseInt(e.target.value)})
    }

    updatePadding = (e) => {
        this.setState({padding: parseInt(e.target.value)})
    }

    updateMargin = (e) => {
        this.setState({margin: parseInt(e.target.value)})
    }

    updateHeight = (e) => {
        this.setState({height: parseInt(e.target.value)})
    }

    updateWidth = (e) => {
        this.setState({width: parseInt(e.target.value)})
    }

    displayImageURL = (e) => {
        let imageInput = document.getElementById("image-input").value;
        this.setState({imageURLList: this.state.imageURLList + imageInput + " "}, function() {
            console.log(this.state.imageURLList)
        })
        //console.log(this.state.imageURL);
        console.log(this.state.imageURLList);
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
       // let imageInput = document.getElementById("image-input");
        //let image = document.getElementById("imageURLIMG");
        //if (imageInput.value) image.src = imageInput.value;
    }

    render() {
        let text, color, fontSize, backgroundColor, borderWidth, borderColor, borderRadius, padding, margin, height, width, imageURLList;
        
        const styles = {
            container: {
                text: this.state.text,
                color: this.state.color,
                fontSize: this.state.fontSize,
                backgroundColor: this.state.backgroundColor,
                borderStyle: "solid",
                borderWidth: this.state.borderWidth,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius,
                padding: this.state.padding,
                margin: this.state.margin,
                height: this.state.height,
                width: this.state.width,
                imageURLList: this.state.imageURLList,
                position: "absolute",
                textAlign: "center",
                overflow: "auto",
                whiteSpace: "nowrap",
                display: "inline-block",
            }
        }
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div style={{overflow: "hidden"}}>
                    <div className="customizeContainer" style={{float: "left", display: "inline-block"}}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div>
                                    <h4><Link to="/"><button class="btn btn-primary btn-lg" type="submit" style={{backgroundColor: "#26a69a"}}>Go Back Home</button></Link></h4>
                                </div>
                                <div>
                                    <h3 className="panel-title" style={{color: "white", textAlign: "center", fontSize: "14pt", fontFamily: "Arial"}}>
                                        Create Logo
                                    </h3>
                                </div>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value, borderWidth: parseInt(borderWidth.value), borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), padding: parseInt(padding.value), margin: parseInt(margin.value), height: parseInt(height.value), width: parseInt(width.value), imageURLList: this.state.imageURLList } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderWidth.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    padding.value = "";
                                    margin.value = "";
                                    height.value = "";
                                    width.value = "";
                                }}>
                                    <form class="form-horizontal">
                                    <div className="form-group row">
                                            <label htmlFor="height" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Height:</label>
                                            <div className="col-9">
                                                <input type="range" className="form-control form-control-lg" name="height" min="0" max="400" ref={node => {
                                                    height = node;
                                                }} placeholder="Height" defaultValue="30" style={{width: "100%"}} onChange={this.updateHeight.bind(this)} required/>
                                            </div>
                                    </div>
                                    <div className="form-group row">
                                            <label htmlFor="width" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Width:</label>
                                            <div className="col-9">
                                                <input type="range" className="form-control form-control-lg" name="width" min="0" max="400" ref={node => {
                                                    width = node;
                                                }} placeholder="Width" defaultValue="80" style={{width: ""}} onChange={this.updateWidth.bind(this)} required/>
                                            </div>
                                    </div>
                                    <div className="form-group row">
                                            <label htmlFor="text" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Text:</label>
                                            <div className="col-9">
                                                <input type="text" className="form-control form-control-lg" name="text" ref={node => {
                                                    text = node;
                                                }} placeholder="Text" defaultValue="Default Logo" style={{width: "100%"}} onChange={this.updateText.bind(this)} required/>
                                            </div>
                                    </div>
                                    <div className="form-group row">
                                            <label htmlFor="imageURL" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>ImageURL:</label>
                                            <div className="col-9" style={{textAlign: "center"}}>
                                                <input type="text" id="image-input" className="form-control form-control-lg" name="imageURL" ref={node => {
                                                    imageURLList = node;
                                                }} placeholder="Text" defaultValue="Image URL" style={{width: "100%"}}  required/>
                                                <button type="button" id="buttonImageURL" className="btn btn-primary btn-lg" onClick= {this.displayImageURL.bind(this)}>Confirm</button>
                                            </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="color" class="col-6 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Color:</label>
                                        <div className="col-4">
                                            <input type="color" className="form-control form-control-lg" name="color" ref={node => {
                                                color = node;
                                            }} placeholder="Color" defaultValue="#000000" onChange={this.updateColor.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="fontSize" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Font Size:</label>
                                        <div className="col-9">
                                            <input type="range" className="form-control form-control-lg" name="fontSize" min="10" max="100" ref={node => {
                                                fontSize = node;
                                            }} placeholder="Font Size" defaultValue="14" onChange={this.updateFontSize.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="backgroundColor" class="col-6 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Background Color:</label>
                                        <div className="col-4">
                                            <input type="color" className="form-control form-control-lg" name="backgroundColor" ref={node => {
                                                backgroundColor = node;
                                            }} placeholder="Background Color" defaultValue="#ffffff" onChange={this.updateBackgroundColor.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="borderWidth" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Border Thickness:</label>
                                        <div className="col-9">
                                            <input type="range" className="form-control form-control-lg" name="borderWidth" min="0" max="100" ref={node => {
                                                borderWidth = node;
                                            }} placeholder="Border Thickness" defaultValue="1" onChange={this.updateBorderWidth.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="borderColor" class="col-6 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Border Color:</label>
                                        <div className="col-4">
                                            <input type="color" className="form-control form-control-lg" name="borderColor" ref={node => {
                                                borderColor = node;
                                            }} placeholder="Border Color" defaultValue="#000000" onChange={this.updateBorderColor.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="borderRadius" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Border Radius:</label>
                                        <div className="col-9">
                                            <input type="range" className="form-control form-control-lg" name="borderRadius" min="0" max="100" ref={node => {
                                                borderRadius = node;
                                            }} placeholder="Border Radius" defaultValue="1" onChange={this.updateBorderRadius.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="padding" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Padding:</label>
                                        <div className="col-9">
                                            <input type="range" className="form-control form-control-lg" name="pading" min="0" max="100" ref={node => {
                                                padding = node;
                                            }} placeholder="Padding" defaultValue="1" onChange={this.updatePadding.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="margin" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Margin:</label>
                                        <div className="col-9">
                                            <input type="range" className="form-control form-control-lg" name="margin" min="0" max="100" ref={node => {
                                                margin = node;
                                            }} placeholder="Margin" defaultValue="1" onChange={this.updateMargin.bind(this)}/>
                                        </div>
                                    </div>
                                    </form>
                                    <div style={{textAlign: "center"}}>
                                         <button type="submit" className="btn btn-primary btn-lg" style={{backgroundColor: "#26a69a"}}>SUBMIT</button>
                                    </div>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col s8" style = {{overflow : "auto", float: "left", display: "contents"}}>
                                <div id="createLogoDiv" style={ styles.container }>{this.state.text.replace(/ /g, '\xa0')}<img src="" id="imageURLIMG" alt=""></img></div>
                    </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;