const Notification = ({ message, red }) => {
  if (message === null) {
    return null;
  }

  const style = {
    color: red ? "firebrick" : "forestgreen",
    backgroundColor: red ? "lightcoral" : "lightgreen",
    borderRadius: "10px",
    margin: "10px 0",
    padding: "10px",
  };

  return (
    <div>
      <p className="error" style={style}>
        {message}
      </p>
    </div>
  );
};

export default Notification;
