const LikeButton = ({ handleLikes }) => {
  return (
    <button className="likeButton" onClick={handleLikes}>
      like
    </button>
  )
}

export default LikeButton
