import PropTypes from 'prop-types'

const DeleteButton = ({ handleDelete, text }) => {
  return (
    <>
      <button style={{ backgroundColor: 'salmon' }} onClick={handleDelete}>
        {text}
      </button>
    </>
  )
}

DeleteButton.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default DeleteButton
