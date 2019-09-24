import React, { Component } from 'react';
import PropTypes from 'prop-types';
import readableDateFromISO from '../../utils/readableDateFromISO';
import './MoistureSensor.scss';

class MoistureSensor extends Component {
  state = {
      // Starts at the most recent data value
      dateIndex: this.props.data.length - 1,
  };

  handlePreviousDate = () => {
    const { dateIndex } = this.state;
    // Only runs if we are not currently on the first reading
    if (dateIndex > 0) {
      this.setState(prevState => ({
        dateIndex: prevState.dateIndex - 1,
      }), () => {
        console.log(this.state);
      });
    }
  }

  handleNextDate = () => {
    const { dateIndex } = this.state;
    const { data } = this.props;
    // Only runs if we are not currently on the last reading
    if (dateIndex < data.length - 1 ) {
        this.setState(prevState => ({
          dateIndex: prevState.dateIndex + 1,
        }), () => {
          console.log(this.state);
        });
    }
  }

  render() {
    const { data, sensorId } = this.props;
    const { dateIndex } = this.state;
    
    const sensor = data[dateIndex];
    const {
      day,
      date,
      time,
    } = readableDateFromISO(sensor.t);

    const value = sensor.v;
    // Fill height assumes that 1 = 0% and 2 = 100% is around 50% ???
    let fillHeight = (value - 1) * 100;
    fillHeight = fillHeight + '%';
    return (
      <div className="sensor-card">
        <div className="sensor-card--name">
          <span className="name">Sensor {sensorId}</span><br />
          <span className="type">Moisture</span>
        </div>
        <div className="sensor-card--date-time">
          <span className="day">{day}</span><br />
          <span className="date">{date}</span><br />
          <span className="time">{time}</span>
        </div>
        <div className="sensor-card--bucket">
          <div 
            className="fill-level"
            style={{
                height: fillHeight,
                willChange: 'height',
                transition: 'height 1s ease',
              }}
          >

          </div>
          <span className="fill-value">{value}</span>
        </div>
        <div className="sensor-card--time-controls">
          <button
            onClick={this.handlePreviousDate}
            disabled={dateIndex <= 0}
          >
            - Hour
          </button>
          <button
            onClick={this.handleNextDate}
            disabled={dateIndex >= data.length - 1}
          >
            + Hour
          </button>
        </div>
      </div>
    )
  }
}

MoistureSensor.propTypes = {
  data: PropTypes.arrayOf([
    PropTypes.shape({
      t: PropTypes.string.isRequired,
      v: PropTypes.string.isRequired,
    }).isRequired,
  ]).isRequired,
};

export default MoistureSensor;