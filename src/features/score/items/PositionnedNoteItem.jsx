import { Close, QueueMusic } from '@mui/icons-material'
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useGetNoteInfoQuery } from '../../../app/services/sparql'
import { setInspectedEntity } from '../../slice/scoreSlice'
import { LoadingEntity } from '../entities/LoadingEntity'

export const PositionnedNoteItem = props => {
  const dispatch = useDispatch()
  const { data: noteLabel } = useGetNoteInfoQuery(props.attachedNoteIri)
  return noteLabel ? (
    <ListItem
      disablePadding
      secondaryAction={
        props.isEntity && (
          <IconButton
            disableRipple
            onClick={() => dispatch(setInspectedEntity({ positionnedNoteIri: props.positionnedNoteIri }))}
          >
            <Close />
          </IconButton>
        )
      }
    >
      <ListItemButton
        onClick={() =>
          !props.isEntity &&
          dispatch(
            setInspectedEntity({
              positionnedNoteIri: props.positionnedNoteIri,
              attachedNoteIri: props.attachedNoteIri,
              clickedNoteIri: props.clickedNoteIri
            })
          )
        }
        sx={props.isEntity && { cursor: 'default' }}
      >
        <ListItemIcon>
          <QueueMusic />
        </ListItemIcon>
        <ListItemText primary={noteLabel} secondary={props.positionnedNoteIri.slice(props.baseUrl.length)} />
      </ListItemButton>
    </ListItem>
  ) : (
    <LoadingEntity />
  )
}