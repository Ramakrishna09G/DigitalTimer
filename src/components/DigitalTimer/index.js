// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="digital-timer-app-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-card-bg-container">
            <div className="timer-card">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-status">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="start-and-reset-bg-container">
            <div className="start-and-reset-container">
              <div className="start-card">
                <button
                  className="play-pause-btn"
                  type="button"
                  onClick={this.onStartOrPauseTimer}
                >
                  <img
                    src={
                      isTimerRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    className="start-icon"
                    alt={isTimerRunning ? 'pause icon' : 'play icon'}
                  />
                  <p className="btn-name">
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </p>
                </button>
              </div>
              <div className="reset-card">
                <button
                  className="reset-btn"
                  type="button"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="reset-icon"
                    alt="reset icon"
                  />
                  <p className="btn-name">Reset</p>
                </button>
              </div>
            </div>

            <div className="set-timer-limit-container">
              <p className="set-timer-limit">Set Timer Limit</p>
              <div className="set-timer-limit-card">
                <button
                  className="decrease-btn"
                  type="button"
                  onClick={this.onDecreaseTimerLimitInMinutes}
                  disabled={isButtonsDisabled}
                >
                  -
                </button>
                <div className="timer-value">
                  <p>{timerLimitInMinutes}</p>
                </div>
                <button
                  className="increase-btn"
                  type="button"
                  onClick={this.onIncreaseTimerLimitInMinutes}
                  disabled={isButtonsDisabled}
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
