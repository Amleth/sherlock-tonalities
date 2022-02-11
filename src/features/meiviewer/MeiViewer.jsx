/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react'

import { createVerovio, getNodeNote, getRestNode, drawVerticalities, load } from './verovioHelpers'
import { annotationsPanelStyle, containerStyle, mainAreaStyle, verovioStyle } from './mei.css'

window.verovioCallback = load

const meiUri =
  'https://raw.githubusercontent.com/guillotel-nothmann/Zarlino_1558/main/meiOldClefsAnalyse/Hellinck_Beati.mei'

const MeiViewer = () => {
  useEffect(() => {
    createVerovio(meiUri) // github.com/rism-digital/verovio-app-react/blob/master/src/App.js
  }, [meiUri])

  const handleMouseOver = e => {
    const n = getNodeNote(e)
    const r = getRestNode(e)
    if (n) {
      n.noteNode.classList.add('hovered')
      console.log('handleMouseOver', n)
    }
    if (r) r.noteNode.classList.add('hovered-rest')
  }

  const handleMouseLeave = e => {
    const n = getNodeNote(e)
    const r = getRestNode(e)
    if (n) {
      n.noteNode.classList.remove('hovered')
      console.log('handleMouseLeave', n)
    }
    if (r) r.noteNode.classList.remove('hovered-rest')
  }

  const handleClick = e => {
    const n = getNodeNote(e)
    console.log('handleClick', n)
  }

  return (
    <div css={containerStyle}>
      <div css={mainAreaStyle}>
        <div
          css={verovioStyle}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseLeave}
          id="verovio_container"
        />
      </div>
    </div>
  )
}

export default MeiViewer
