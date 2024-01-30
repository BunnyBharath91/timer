import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerLimit: 25,
      minLeft: 25,
      secLeft: 0,
      timerPaused: true,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
    console.log('did mount')
  }

  componentWillUnmount() {
    const {minLeft, secLeft} = this.state
    if (minLeft === 0 && secLeft === 0) {
      clearInterval(this.timerId)
      console.log('cleared interval')
    }
    console.log('component will unmount')
  }

  tick = () => {
    const {timerPaused, minLeft, secLeft} = this.state
    let updatedSecLeft = 0
    let updatedMinLeft = 0
    if (minLeft === 0) {
      if (secLeft === 0) {
        updatedSecLeft = 0
        updatedMinLeft = 0
      } else {
        updatedSecLeft = secLeft - 1
        updatedMinLeft = 0
      }
    } else {
      updatedSecLeft = secLeft === 0 ? 59 : secLeft - 1
      updatedMinLeft = secLeft === 0 ? minLeft - 1 : minLeft
    }

    if (!timerPaused) {
      this.setState({
        secLeft: updatedSecLeft,
        minLeft: updatedMinLeft,
      })
    }
  }

  onDecreaseTimerLimit = () => {
    const {timerLimit, minLeft} = this.state
    const updatedTimerLimit = timerLimit > 0 ? timerLimit - 1 : 0
    const updatedMinLeft = minLeft > 0 ? minLeft - 1 : 0
    this.setState({
      timerLimit: updatedTimerLimit,
      minLeft: updatedMinLeft,
    })
  }

  onIncreaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
      minLeft: prevState.minLeft + 1,
    }))
  }

  onStartPauseTimer = () => {
    const {timerPaused} = this.state
    this.setState({
      timerPaused: !timerPaused,
    })
  }

  onResetTimer = () => {
    this.setState({
      timerLimit: 25,
      minLeft: 25,
      secLeft: 0,
      timerPaused: true,
    })
  }

  render() {
    const {timerLimit, minLeft, secLeft, timerPaused} = this.state

    return (
      <div className="bg-container">
        <div className="main-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer-container">
            <div className="timer-card-container">
              <div className="timer-card">
                <h1 className="timer">
                  {minLeft === 0 ? '00' : minLeft}:
                  {secLeft === 0 ? '00' : secLeft}
                </h1>
                <p className="timer-text">
                  {timerPaused ? 'Paused' : 'Running'}
                </p>
              </div>
            </div>
            <div className="timer-operating-container">
              <div className="start-reset-container">
                <button
                  className="button"
                  type="button"
                  onClick={this.onStartPauseTimer}
                >
                  <img
                    id="play-icon"
                    alt={timerPaused ? 'play icon' : 'pause icon'}
                    src={
                      timerPaused
                        ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                    }
                    className="controls-img"
                  />
                  <p className="controls-name">
                    {timerPaused ? 'Start' : 'Pause'}
                  </p>
                </button>

                <button
                  type="button"
                  className="button"
                  onClick={this.onResetTimer}
                >
                  <img
                    id="reset-icon"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="controls-img"
                  />
                  <p className="controls-name">Reset</p>
                </button>
              </div>
              <p className="set-timer-limit-text">Set Timer Limit</p>
              <div className="timer-change-container">
                <button
                  type="button"
                  className="timer-limit-button"
                  onClick={this.onDecreaseTimerLimit}
                >
                  -
                </button>
                <p className="timer-limit">{timerLimit}</p>
                <button
                  type="button"
                  className="timer-limit-button"
                  onClick={this.onIncreaseTimerLimit}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
