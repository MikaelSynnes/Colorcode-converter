import React, { Component } from "react";

class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      R: '255',
      G: '0',
      B: '0',
      A: '100',
      HUE: '0',
      S: '100',
      L: '50',
      HEX: '#FF0000'

    };
    this.handleHex = this.handleHex.bind(this);
    this.handleRGB = this.handleRGB.bind(this);

    this.handleHsl = this.handleHsl.bind(this);

  }
  render() {
    return (

      <div>
        <div id="RGBA">
          <h1>RGBA</h1>
          <form>
            <input type="text" maxlength="3" name="R" value={this.state.R} onChange={this.handleRGB} />
            <input type="text" maxlength="3" name="G" value={this.state.G} onChange={this.handleRGB} />
            <input type="text" maxlength="3" name="B" value={this.state.B} onChange={this.handleRGB} />
            <input type="text" maxlength="3" name="A" value={this.state.A} onChange={this.handleRGB} /><p>%</p>
          </form>

        </div>
        <div id="HSL">
          <h1> HSL</h1>
          <form>
            <input type="text" name="HUE" value={this.state.HUE} onChange={this.handleHsl} /><p>°</p>
            <input type="text" name="S" value={this.state.S} onChange={this.handleHsl} /><p>%</p>
            <input type="text" name="L" value={this.state.L} onChange={this.handleHsl} /><p>%</p>
          </form>
        </div>
        <div id="HEX">
          <h1> HEX</h1>
          <input type="text" maxlength="7" name="HEX" value={this.state.HEX} onChange={this.handleHex} />


        </div>
      
        <div id="Color" style={{ backgroundColor: this.state.HEX, opacity:this.state.A/100 }}>
        <h1> Color</h1>
        </div>

      </div>
    );

  }

  //Handles events caused by the Hsl block.
  handleHsl(event) {
    this.setState({
      [event.target.name]: event.target.value
    }
      , () => {
        var rgb = this.hslToRgb(this.state.HUE, this.state.S, this.state.L);
        console.log(this.state.HUE + this.state.S + this.state.L);
        console.log(rgb);
        var newr = rgb[0];
        var newg = rgb[1];
        var newb = rgb[2];
        this.setState({
          R: Math.round(newr),
          G: Math.round(newg),
          B: Math.round(newb
)
        }, () => {
          this.setState({
            HEX: '#' + this.convertToHex(this.state.R) + this.convertToHex(this.state.G) + this.convertToHex(this.state.B)

          })
        }
        )
      })
  }

  //handles events from the rgb block
  handleRGB(event) {
    this.setState({
      [event.target.name]: event.target.value
    }
      //callback to make sure the state is finished updating before calling a new state on hex
      , () =>
        this.setState({
          HEX: '#' + this.convertToHex(this.state.R) + this.convertToHex(this.state.G) + this.convertToHex(this.state.B)
        }, () => this.updateHsl())

    )
  }
  //handles events from the hex block
  handleHex(event) {

    this.setState({
      [event.target.name]: event.target.value,
    }//callback to make sure the state is finished updating before calling a new state
      , () =>
        this.setState({

          R: this.convertToNumber(this.state.HEX.charAt(1) + this.state.HEX.charAt(2)),
          G: this.convertToNumber(this.state.HEX.charAt(3) + this.state.HEX.charAt(4)),
          B: this.convertToNumber(this.state.HEX.charAt(5) + this.state.HEX.charAt(6))

        }, () => this.updateHsl())
    )

  }
  //convering a number to hex
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
  rgbToHsl(float) {
    return float / 255;
  }
  /*
 
  // first attempt at making the Hsl algorithm.
 
  HslToRgb(h, s, l) {
 
     s = s / 100;
     l = l / 100;
     var hue = h / 360;
 
     var r, g, b;
     var temp1, temp2;
     var tempr, tempg, tempb;
     if (s === 0) {
       r = g = b = l;
 
     }
     if (l < 0.5) {
       temp1 = l * (1 + s);
     } else if (l >= 0.5) {
       temp1 = l + s - (l * s);
     }
     temp2 = 2 * l - temp1;
 
     console.log('hue: ' + hue);
     tempr = (hue + 1 / 3);
     tempg = (hue);
     tempb = (hue - 1 / 3);
     console.log('tempr: ' + tempr + 'tempg: ' + tempg + 'tempb: ' + tempb)
 
 
     r = this.temptest(tempr, temp1, temp2);
     g = this.temptest(tempg, temp1, temp2);
     b = this.temptest(tempb, temp1, temp2);
     console.log('r: ' + r + 'g: ' + g + 'b: ' + b)
 
     this.setState({
       R: (r * 255),
       G: (g * 255),
       B: (b * 255)
     }, () => {
       this.setState({
         HEX: '#' + this.convertToHex(this.state.R) + this.convertToHex(this.state.G) + this.convertToHex(this.state.B)
       })
     }
     )
   }
   temptest(int, temp1, temp2) {
 
     if (int < 0) {
       int = int + 1;
     }
     if (int > 1) {
       int = int - 1;
     }
     console.log(int);
     if (int < 1 / 6) {
       console.log("function 1");
       return (temp2 + (temp1 - temp2) * 6 * int);
 
     }
     else if (int < 1 / 2) {
       console.log("function 2");
       return temp2;
 
     }
     else if (int < 2 / 3) {
       console.log("function 3");
       return (temp2 + (temp1 - temp2) * (0.666 - int) * 6);
 
     }
     else {
       console.log("This shouldnt happen");
     }
 
 
   }
   */


  //function to convert hsl to rgb.
  //returns array with 3 values ARray[r,g,b]

  hslToRgb(h, s, l) {
    var r, g, b;
    h = h / 360;
    s = s / 100;
    l = l / 100;

    if (s == 0) {
      r = g = b = l;
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q;
      if (l < 0.5) {
        q = l * (1 + s)
      }
      else {
        q = l + s - l * s;
      }
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
  }


  //function to update the data in hsl block
  updateHsl() {
    var re = this.rgbToHsl(this.state.R);
    var gr = this.rgbToHsl(this.state.G);
    var bl = this.rgbToHsl(this.state.B);
    var al = this.rgbToHsl(this.state.A);
    var min = Math.min(re, bl, gr);
    var max = Math.max(re, bl, gr);;
    var Sa;
    var hue;

    var li = ((min + max) / 2);
    if (max === min) {
      Sa = 0;
      hue = 0;
    }
    else {
      if (li >= 0.5) {
        Sa = (max - min) / (2.0 - max - min);
      }
      else if (li < 0.5) {
        Sa = (max - min) / (max + min);
      }
      if (re == max) {
        hue = ((gr - bl) / (max - min)) * 60;
      }
      else if (gr == max) {
        hue = ((bl - re) / (max - min) + 2) * 60;
      }
      else if (bl == max) {
        hue = (((re - gr) / (max - min)) + 4) * 60;
      }

      if (hue < 0) {
        hue = hue + 360;
      }

    }

    this.setState({
      HUE: Math.round(hue),
      L: (li * 100).toFixed(1),
      S: (Sa * 100).toFixed(1),

    })


  }


  //converts a number to hex
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