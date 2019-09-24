import React, { Component } from 'react';

import MoistureSensor from './cards/MoistureSensor';
import data from '../data';

class MoistureSensorCollection extends Component {
  state = {
      sensors: data,
  }

  render() {
    const sensorElements = this.state.sensors.map((sensor, index) => {
      // pass only the data of each sensor
      const sensorId = index + 1;
      const data = sensor;
      return (
        <MoistureSensor data={data} sensorId={sensorId} />
      );

    });

    return (
      <div>
          {sensorElements}
      </div>
    );
  };
};

export default MoistureSensorCollection;
