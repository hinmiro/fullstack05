const ShowButton = ({ handleClick, text }) => {
  return (
    <>
      <button className="showMoreButton" onClick={handleClick}>
        {text}
      </button>
    </>
  )
}

export default ShowButton
