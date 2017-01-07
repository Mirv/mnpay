import React from "react";

import Numeral from "numeral";
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, ResponsiveContainer } from "recharts";

export default class DistChart extends React.Component {

  formatTick (value) {
    var numeralValue = new Numeral(value);
    return numeralValue.format("0,0");
  }

  render () {
    var min = Infinity;
    var max = 0;
    var data = this.props.data.map(function (object, i) {
      var midpoint = (object.upper + object.lower) / 2;
      midpoint = Number(midpoint.toFixed(2));
      if (midpoint < min) min = midpoint;
      if (midpoint > max) max = midpoint;
      return { x: midpoint, y: object.count };
    });
    min = Math.max(Math.floor(min / 10000) * 10000 - 10000, 0);
    max = Math.ceil(max / 10000) * 10000 + 10000;
    return (<ResponsiveContainer height={300}>
             <BarChart data={data}>
               <XAxis dataKey="x"
                      tickCount={10}
                      type="number"
                      domain={[min, max]}
                      tickFormatter={this.formatTick}/>
               <Bar dataKey="y"
                     fill="#82ca9d"/>
               <CartesianGrid strokeDasharray="3 3" />
               <YAxis />
             </BarChart>
           </ResponsiveContainer>);
  }
}
DistChart.propTypes = {
  data: React.PropTypes.array.isRequired
};
