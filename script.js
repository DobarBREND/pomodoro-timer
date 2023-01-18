import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [play, setPlay] = React.useState(false);
  const [timingType, setTimingType] = React.useState("SESSION");
  const [timeLeft, setTimeLeft] = React.useState(1500);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);


  const title = timingType === "SESSION" ? "Session" : "Break";
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "wrapper" }, /*#__PURE__*/
    React.createElement("h1", null, "Pomodoro Timer"), /*#__PURE__*/
    React.createElement("div", { className: "break-session-length" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", { id: "break-label" }, "Break Length"), /*#__PURE__*/
    React.createElement("div", { id: "order" }, /*#__PURE__*/
    React.createElement("button", { disabled: play, onClick: handleBreakIncrease, id: "break-increment" }, "Increase"), /*#__PURE__*/
    React.createElement("strong", { id: "break-length" }, breakLength), /*#__PURE__*/
    React.createElement("button", { disabled: play, onClick: handleBreakDecrease, id: "break-decrement" }, "Decrease"))), /*#__PURE__*/


    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", { id: "session-label" }, "Session Length"), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", { disabled: play, onClick: handleSessionIncrease, id: "session-increment" }, "Increase"), /*#__PURE__*/
    React.createElement("strong", { id: "session-length" }, sessionLength), /*#__PURE__*/
    React.createElement("button", { disabled: play, onClick: handleSessionDecrease, id: "session-decrement" }, "Decrease")))), /*#__PURE__*/



    React.createElement("div", { className: "timer-wrapper" }, /*#__PURE__*/
    React.createElement("button", { onClick: handlePlay, id: "start_stop" }, /*#__PURE__*/React.createElement("span", null, "Start"), " \xA0Stop"), /*#__PURE__*/
    React.createElement("div", { className: "timer" }, /*#__PURE__*/
    React.createElement("h2", { id: "timer-label" }, title), /*#__PURE__*/
    React.createElement("h3", { id: "time-left" }, timeFormatter())), /*#__PURE__*/


    React.createElement("button", { onClick: handleReset, id: "reset" }, "Reset")), /*#__PURE__*/

    React.createElement("p", null, "\xA9 Vladimir Jovanovi\u0107 :: DobarBREND 2023")), /*#__PURE__*/


    React.createElement("audio", { id: "beep", preload: "auto", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));

};



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));