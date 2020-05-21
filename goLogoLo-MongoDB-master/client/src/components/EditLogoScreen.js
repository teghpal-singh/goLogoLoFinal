import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
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

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
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
            updateLogo(
                id: $id,
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
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

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
        query: true,
        height: "25pt",
        width: "25pt",
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

    updateVariableValue(a)
    {
        this.setState({margin: parseInt(a.value)})
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
        var container = document.getElementById('editLogoDiv');

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

        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (this.state.query)
                    {
                        this.setState({text: data.logo.text})
                        this.setState({color: data.logo.color})
                        this.setState({fontSize: data.logo.fontSize})
                        this.setState({backgroundColor: data.logo.backgroundColor})
                        this.setState({borderWidth: data.logo.borderWidth})
                        this.setState({borderColor: data.logo.borderColor})
                        this.setState({borderRadius: data.logo.borderRadius})
                        this.setState({padding: data.logo.padding})
                        this.setState({margin: data.logo.margin})
                        this.setState({query: false})
                        this.setState({height: data.logo.height})
                        this.setState({width: data.logo.width})
                        this.setState({imageURLList: data.logo.imageURLList})
                    }
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
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div>
                                <div className="customizeContainer" style={{float: "left", display: "inline-block"}}>
                                    <div className="panel panel-default" style={{float: "left"}}>
                                        <div className="panel-heading">
                                            <h4><Link to="/"><button class="btn btn-primary btn-lg" type="submit" style={{backgroundColor: "#26a69a"}}>Go Back Home</button></Link></h4>
                                            <h3 className="panel-title" style={{color: "white", textAlign: "center", fontSize: "14pt", fontFamily: "Arial"}}>
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value, borderWidth: parseInt(borderWidth.value), borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), padding: parseInt(padding.value), margin: parseInt(margin.value), height: parseInt(height.value), width: parseInt(width.value), imageURLList: this.state.imageURLList } });
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
                                                                }} placeholder="Height" defaultValue={data.logo.height} style={{width: "100%"}} onChange={this.updateHeight.bind(this)} required/>
                                                             </div>
                                                    </div>
                                                    <div className="form-group row">
                                                            <label htmlFor="width" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Width:</label>
                                                            <div className="col-9">
                                                                <input type="range" className="form-control form-control-lg" name="width" min="0" max="400" ref={node => {
                                                                    width = node;
                                                                }} placeholder="Width" defaultValue={data.logo.width} style={{width: ""}} onChange={this.updateWidth.bind(this)} required/>
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                            <label htmlFor="text" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Text:</label>
                                                            <div className="col-9">
                                                                <input type="text" className="form-control form-control-lg" name="text" ref={node => {
                                                                    text = node;
                                                                }} placeholder="Text" defaultValue={data.logo.text} style={{width: "100%"}} onChange={this.updateText.bind(this)}/>
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                            <label htmlFor="imageURL" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>ImageURL:</label>
                                                            <div className="col-9" style={{textAlign: "center"}}>
                                                                <input type="text" id="image-input" className="form-control form-control-lg" name="imageURL" ref={node => {
                                                                    imageURLList = node;
                                                                }} placeholder="Text" defaultValue={data.logo.imageInput} style={{width: "100%"}}  required/>
                                                                <button type="button" id="buttonImageURL" className="btn btn-primary btn-lg" onClick= {this.displayImageURL.bind(this)}>Confirm</button>
                                                            </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="color" class="col-6 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Color:</label>
                                                        <div className="col-4">
                                                            <input type="color" className="form-control form-control-lg" name="color" ref={node => {
                                                                color = node;
                                                            }} placeholder="Color" defaultValue={data.logo.color} onChange={this.updateColor.bind(this)}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="fontSize" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Font Size:</label>
                                                        <div className="col-9">
                                                            <input type="range" className="form-control form-control-lg" name="fontSize" min="10" max="100" onInput="validity.valid || (value='');" ref={node => {
                                                                fontSize = node;
                                                            }} placeholder="Font Size" defaultValue={data.logo.fontSize} onChange={this.updateFontSize.bind(this)}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="backgroundColor" class="col-6 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Background Color:</label>
                                                        <div className="col-4">
                                                            <input type="color" className="form-control form-control-lg" name="backgroundColor" ref={node => {
                                                                backgroundColor = node;
                                                            }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} onChange={this.updateBackgroundColor.bind(this)}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="borderWidth" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Border Thickness:</label>
                                                        <div className="col-9">
                                                            <input type="range" className="form-control form-control-lg" name="borderWidth" min="0" oninput="validity.valid || (value='');" ref={node => {
                                                                borderWidth = node;
                                                            }} placeholder="Border Thickness" defaultValue={data.logo.borderWidth} onChange={this.updateBorderWidth.bind(this)}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="borderColor" class="col-6 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Border Color:</label>
                                                        <div className="col-4">
                                                            <input type="color" className="form-control form-control-lg" name="borderColor" ref={node => {
                                                                borderColor = node;
                                                            }} placeholder="Border Color" defaultValue={data.logo.borderColor} onChange={this.updateBorderColor.bind(this)}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="borderRadius" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Border Radius:</label>
                                                        <div className="col-9">
                                                            <input type="range" className="form-control form-control-lg" name="borderRadius" min="0" oninput="validity.valid || (value='');" ref={node => {
                                                                borderRadius = node;
                                                            }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange={this.updateBorderRadius.bind(this)}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="padding" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Padding:</label>
                                                        <div className="col-9">
                                                            <input type="range" className="form-control form-control-lg" name="pading" min="0" oninput="validity.valid || (value='');" ref={node => {
                                                                padding = node;
                                                            }} placeholder="Padding" defaultValue={data.logo.padding} onChange={this.updatePadding.bind(this)}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="margin" class="col-3 col-form-label" style={{fontSize: "12pt", fontFamily: "Arial"}}>Margin:</label>
                                                        <div className="col-9">
                                                            <input type="range" className="form-control form-control-lg" name="margin" min="0" oninput="validity.valid || (value='');" ref={node => {
                                                                margin = node;
                                                            }} placeholder="Margin" defaultValue={data.logo.margin} onChange={this.updateMargin.bind(this)}/>
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
                                    <div className="col s8" style = {{overflow : "auto", float: "left", display: "contents"}}>
                                        <div id="editLogoDiv" style={ styles.container }>{this.state.text.replace(/ /g, '\xa0')}</div>
                                    </div>
                                </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;