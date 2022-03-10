import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GlobalTypes } from "../../redux/types/globalTypes";
import "./modalCall.scss";

const CallModal = () => {
  const call = useSelector((state) => state.call);
  const peer = useSelector((state) => state.peer);
  const { user } = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [tracks, setTracks] = useState(null);
  const [callOther, setCallOther] = useState(null);

  const yourVideo = useRef();
  const otherVideo = useRef();

  // handle answer call
  const handleAnswer = () => {
    openStream(call.video)
      .then((stream) => {
        // play current video stream
        playStream(yourVideo.current, stream);
        const track = stream.getTracks();
        setTracks(track);
        // connect other peer id
        const callOther = peer.call(call.peerID, stream);
        // play other video stream
        callOther.on("stream", (remoteStream) => {
          playStream(otherVideo.current, remoteStream);
        });
        // set state
        setAnswer(true);
        setCallOther(callOther);
      })
      .catch((err) => console.log(err));
  };

  // add messages
  const addMessage = () => {};

  // handle end call
  const handleClose = () => {
    tracks && tracks.forEach((track) => track.stop());
    if (callOther) callOther.close();
    socket.emit("endCallToUser", { sender: user._id });
    dispatch({
      type: GlobalTypes.CALL,
      payload: null,
    });
  };

  // handle open stream call
  const openStream = (video) => {
    const config = { audio: true, video };
    return navigator.mediaDevices.getUserMedia(config);
  };

  // handle play stream call
  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  // Set Time
  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);

  // auto close after 15s when not response
  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit("endCallToUser", { sender: user._id });
        dispatch({
          type: GlobalTypes.CALL,
          payload: null,
        });
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, user._id]);

  // add call event peer
  useEffect(() => {
    peer.on("call", (otherCall) => {
      openStream(call.video)
        .then((stream) => {
          // open your video stream
          if (yourVideo.current) {
            playStream(yourVideo.current, stream);
          }
          const track = stream.getTracks();
          setTracks(track);

          otherCall.answer(stream);
          otherCall.on("stream", (remoteStream) => {
            if (otherVideo.current) {
              playStream(otherVideo.current, remoteStream);
            }
          });

          setAnswer(true);
          setCallOther(otherCall);
        })
        .catch((err) => console.log(err));
    });

    return () => peer.removeListener("call");
  }, [peer, call.video]);

  // end call
  useEffect(() => {
    socket.on("endCallToClient", (data) => {
      tracks && tracks.forEach((track) => track.stop());
      if (callOther) callOther.close();
      dispatch({
        type: GlobalTypes.CALL,
        payload: null,
      });
    });
    return () => socket.off("endCallToClient");
  }, [dispatch, socket, tracks, otherVideo]);

  return (
    <Modal
      show={Boolean(call)}
      centered
      className="modal-call"
      animation={false}
    >
      <Modal.Body className="modal-call-body">
        <div
          className="wrapper-call"
          style={answer && call.video ? { pointerEvents: "none" } : {}}
        >
          <img src={call.avatar} alt="" className="wrapper-call-avatar" />
          <h3 className="wrapper-call-recipient">{call.fullname}</h3>
          <h5 className="wrapper-call-own">{user.fullname}</h5>
          <p className="text-info">
            <b>Calling...</b>
          </p>
          <div className="wrapper-call-timer">
            {hours > 0 && (
              <span>{hours.toString().length < 2 ? `0${hours}` : hours}:</span>
            )}
            <span>{mins.toString().length < 2 ? `0${mins}` : mins}</span>:
            <span>{second.toString().length < 2 ? `0${second}` : second}</span>
          </div>
          <div className="wrapper-call-action">
            <i
              className="fas fa-phone-alt text-danger"
              onClick={handleClose}
            ></i>

            {call.recipient && (
              <>
                {call?.video ? (
                  <i
                    onClick={handleAnswer}
                    className="fas fa-video text-success"
                  ></i>
                ) : (
                  <i
                    onClick={handleAnswer}
                    className="fas fa-phone-alt text-success"
                  ></i>
                )}
              </>
            )}
          </div>
        </div>
        <div
          className="wrapper-video"
          style={{
            opacity: answer && call.video ? "1" : "0",
          }}
        >
          <video
            ref={yourVideo}
            className="wrapper-video-you"
            playsInline
            muted
          />
          <video ref={otherVideo} className="wrapper-video-other" playsInline />
          <div className="wrapper-video-time">
            {hours > 0 && (
              <span>{hours.toString().length < 2 ? `0${hours}` : hours}:</span>
            )}
            <span>{mins.toString().length < 2 ? `0${mins}` : mins}</span>:
            <span>{second.toString().length < 2 ? `0${second}` : second}</span>
          </div>
          <i
            className="fas fa-phone-alt text-danger wrapper-video-close"
            onClick={handleClose}
          ></i>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CallModal;
