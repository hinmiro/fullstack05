const DeleteButton = ({ handleDelete, text }) => {
  return (
    <>
      <button style={{ backgroundColor: "salmon" }} onClick={handleDelete}>
        {text}
      </button>
    </>
  );
};

export default DeleteButton;
