import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/successAnimation.json";

const successAnimation =
  () =>
  ({ onComplete }) => {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <Lottie
        options={defaultOptions}
        height={500}
        width={400}
        eventListeners={[
          {
            eventName: "complete",
            callback: onComplete,
          },
        ]}
      />
    );
  };

export default successAnimation;
