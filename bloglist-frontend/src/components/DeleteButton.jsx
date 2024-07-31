const DeleteButton = ({ handleDelete, text }) => {
  return (
    <>
      <button onClick={handleDelete}>{text}</button>
    </>
  );
};

export default DeleteButton;
