import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { message } from 'antd';

const rgbToHex = (rgbString) => {
  const rgb = rgbString.match(/\d+/g);
  let r = parseInt(rgb[0], 10).toString(16);
  let g = parseInt(rgb[1], 10).toString(16);
  let b = parseInt(rgb[2], 10).toString(16);
  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b = b.length === 1 ? `0${b}` : b;
  return `#${r}${g}${b}`;
};

class Palette extends Component {
  componentDidMount() {
    this.hexColors = {};
    Object.keys(this.colorNodes).forEach((key) => {
      this.hexColors[key] = rgbToHex(getComputedStyle(this.colorNodes[key])['background-color']);
    });
    this.forceUpdate();
  }
  render() {
    this.colorNodes = this.colorNodes || {};
    const { name, description } = this.props.color;
    const colors = [];
    for (let i = 1; i <= 10; i += 1) {
      const colorText = `${name}-${i}`;
      colors.push(
        <CopyToClipboard
          text={this.hexColors ? this.hexColors[colorText] : ''}
          onCopy={() => message.success(`@${colorText} copied: ${this.hexColors[colorText]}`)}
          key={colorText}
        >
          <div
            key={i}
            ref={(node) => { this.colorNodes[`${name}-${i}`] = node; }}
            className={`main-color-item palatte-${name}-${i}`}
            style={{
              color: i > 5 ? '#fff' : 'unset',
              fontWeight: i === 6 ? 'bold' : 'normal',
            }}
            title="click to copy color"
          >
            {colorText}
            {this.hexColors
              ? <span className="main-color-value">{this.hexColors[colorText]}</span>
              : null}
          </div>
        </CopyToClipboard>
      );
    }
    return (
      <div className="color-palette">
        <div className="color-title">
          {name}
          <span className="color-description">{description}</span>
        </div>
        <div className="main-color">{colors}</div>
      </div>
    );
  }
}

const ColorPalettes = () => {
  const colors = [
    {
      name: 'red',
      description: '???????????????',
    },
    {
      name: 'green',
      description: '????????????????????????',
    },
    {
      name: 'blue',
      description: '???????????????',
    },
    {
      name: 'pink',
      description: '????????????????????????',
    },
    {
      name: 'orange',
      description: '???????????????',
    },
    {
      name: 'purple',
      description: '???????????????',
    },
    {
      name: 'yellow',
      description: '???????????????',
    },
    {
      name: 'cyan',
      description: '???????????????????????????',
    },
    {
      name: 'grey',
      description: '???????????????',
    },
  ];
  return (
    <div>
      {colors.map(color => <Palette key={color.name} color={color} />)}
    </div>
  );
};

export default ColorPalettes;
