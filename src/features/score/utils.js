import { ANALYTICAL_ENTITY, NOTE, POSITIONNED_NOTE, SCORE, SELECTION, VERTICALITY } from '../meiviewer/constants'

export const findKey = item =>
  item && (item.noteIri || item.verticalityIri || item.positionnedNoteIri || item.selectionIri || item.annotationIri)

export const findType = ({
  noteIri,
  verticalityIri,
  positionnedNoteIri,
  selectionIri,
  scoreIri,
  analyticalEntityIri,
}) =>
  (noteIri && NOTE) ||
  (verticalityIri && VERTICALITY) ||
  (positionnedNoteIri && POSITIONNED_NOTE) ||
  (selectionIri && SELECTION) ||
  (analyticalEntityIri && ANALYTICAL_ENTITY) ||
  (scoreIri && SCORE)