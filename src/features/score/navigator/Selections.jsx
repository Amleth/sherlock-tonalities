import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material'
import { useGetSelectionsQuery } from '../../../app/services/sparql'

export const Selections = props => {
  const { data: selections } = useGetSelectionsQuery(props.scoreIri)

  return (
    <List subheader={<ListSubheader>Created selections</ListSubheader>}>
      {selections?.map(selection => (
        <ListItem key={selection}>
          <ListItemButton>
            <ListItemText
              primary={`Selection n°${selections.indexOf(selection)}`}
              secondary={selection.slice(props.baseUrl.length)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
