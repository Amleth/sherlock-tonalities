import { BubbleChart, ChevronRight, Close, ExpandMore } from '@mui/icons-material'
import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChildSelectionsQuery } from '../../../app/services/sparql'
import { setInspectedEntity, setSelectedEntity } from '../../../app/services/scoreSlice'
import { LoadingEntity } from '../entities/LoadingEntity'
import { findKey } from '../utils'
import { ConceptItem } from './ConceptItem'
import { Item } from './Item'
import { withDispatch } from './withDispatch'

const BaseSelectionItem = ({ selectionIri, concepts, isEntity, baseUrlLength, dispatch }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { isInspectionMode, isSelectionMode } = useSelector(state => state.score)
  const { data: children } = useGetChildSelectionsQuery(selectionIri)
  const conceptIri = concepts?.find(e => e.entity === selectionIri)?.concept

  return children ? (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <>
            {isEntity && (
              <IconButton
                onClick={() =>
                  (isInspectionMode && dispatch(setInspectedEntity({ selectionIri }))) ||
                  (isSelectionMode && dispatch(setSelectedEntity({ selectionIri })))
                }
              >
                <Close />
              </IconButton>
            )}
            {conceptIri && <ConceptItem conceptIri={conceptIri} />}
          </>
        }
      >
        <IconButton disableRipple onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ExpandMore /> : <ChevronRight />}
        </IconButton>
        <ListItemButton
          onClick={() => !isEntity && isInspectionMode && dispatch(setInspectedEntity({ selectionIri }))}
          sx={isEntity && { cursor: 'default' }}
        >
          <ListItemIcon>
            <BubbleChart />
          </ListItemIcon>
          <ListItemText
            primary={`Selection with ${children.length} elements`}
            secondary={selectionIri.slice(baseUrlLength)}
          />
        </ListItemButton>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List sx={{ pl: 2 }} dense disablePadding>
          {children?.map(child => (
            <Item key={findKey(child)} {...child} {...{ concepts }} />
          ))}
        </List>
      </Collapse>
    </>
  ) : (
    <LoadingEntity />
  )
}

export const SelectionItem = withDispatch(BaseSelectionItem)