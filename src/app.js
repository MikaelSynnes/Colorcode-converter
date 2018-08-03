import React, { Component } from "react";

class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      R: '255',
      G: '0',
      B: '0',
      A: '100%',
      Hs: '0',
      S: '100%',
      L: '50%',
      HEX: '#FF0000'

    };
    this.handleHex = this.handleHex.bind(this);
    this.handleRGB = this.handleRGB.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  render() {
    return (

      <div>
        <div id="RGBA">


          <h1>RGBA</h1>
          <form >


            <input type="text" maxlength="3" name="R" value={this.state.R} onChange={this.handleRGB} />
            <input type="text" maxlength="3" name="G" value={this.state.G} onChange={this.handleRGB} />
            <input type="text" maxlength="3" name="B" value={this.state.B} onChange={this.handleRGB} />
            <input type="text" maxlength="3" name="A" value={this.state.A} onChange={this.handleRGB} />

            <input type="submit" value="Submit" />


          </form>
         
        </div>
        <div id="HSL">
          <h1> HSL</h1>
          <form>
            <input type="text" name="Hs" value={this.state.Hs} onChange={this.handleChange} />
            <input type="text" name="S" value={this.state.S} onChange={this.handleChange} />
            <input type="text" name="L" value={this.state.L} onChange={this.handleChange} />
          </form>
        </div>
        <div id="HEX">
          <h1> HEX</h1>
          <input type="text" maxlength="7"name="HEX" value={this.state.HEX} onChange={this.handleHex} />


        </div>
        <div id="Color" style={{ backgroundColor: this.state.HEX }}>
        </div>

      </div>
    );

  }

  handleRGB(event) {
    this.setState({
      [event.target.name]: event.target.value,
      HEX: '#' + this.convertToHex(event.target.value) + this.convertToHex(event.target.value) + this.convertToHex(event.target.value)
    })


  }
  handleHex(event) {
    this.setState({
      [event.target.name]: event.target.value,

      R: this.convertToNumber(event.target.value.charAt(1) + event.target.value.charAt(2)),
      G: this.convertToNumber(event.target.value.charAt(3) + event.target.value.charAt(4)),
      B: this.convertToNumber(event.target.value.charAt(5) + event.target.value.charAt(6))
    })
  }
  handleSubmit(event) {

    event.preventDefault();

    this.setState({ HEX: this.convertToHex(this.state.R) + this.convertToHex(this.state.G) + this.convertToHex(this.state.B) })
  }
  convertToHex(int) {
    if (int > 255) {
      return "To high";
    }
    var i = Math.trunc(int / 16);
    var rest = ((int / 16 - i) * 16);
    return this.intToHexDecimal(i) + this.intToHexDecimal(rest);

  }
  convertToNumber(str) {
    return parseInt(str, 16);
    /*console.log(str);
    var i = this.hexToInt(str.charAt(0));
    var o = this.hexToInt(str.charAt(1));
    this.int = (16*i+o)
    return (this.int);
*/
  }

  intToHexDecimal(int) {
    var str = int.toString();
    if (int >= 15) {
      return "F";
    }
    if (int >= 14) {
      return "E";
    }
    if (int >= 13) {
      return "D";
    }
    if (int >= 12) {
      return "C";
    }
    if (int >= 11) {
      return "B";
    }
    if (int >= 10) {
      return "A";
    }
    if (int < 10) {
      return str;
    }
  }




}


export default app;