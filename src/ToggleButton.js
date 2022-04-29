import React from 'react'
import cl from './ToggleButton.module.css'
function ToggleButton({checked, onChecked}) {
  return (
    <div className={cl.toggleContainer} onClick={onChecked}>
    <div className={`${cl.dialogButton} ${checked ? "" : `${cl.disabled}`}`}>
    </div>
  </div>
  )
}

export default ToggleButton