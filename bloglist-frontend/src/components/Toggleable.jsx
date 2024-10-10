import { useState, forwardRef, useImperativeHandle } from 'react'

// eslint-disable-next-line react/display-name
const Toggleable = forwardRef((props, ref) => {
  const { buttonLabel } = props
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div id="newBlogButtonId">
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    </>
  )
})

export default Toggleable
