import React from "react";

const Notification = ({ message }) => {
  console.log(message);
  const alertStyle = {
    color: message[1] === 1 ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message.length === 0) return null;
  return <div style={alertStyle}>{message[0]}</div>;
};

export default Notification;
