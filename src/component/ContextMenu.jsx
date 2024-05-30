import { SmallAddIcon } from '@chakra-ui/icons';
import React from "react";
import useMenuRightClick from "./onMenuRightClick";
import {Box, List, ListIcon, ListItem, Button} from '@chakra-ui/react';


const ContextMenu = () => {
  const { x, y, showMenu } = useMenuRightClick();
    
  return (
    <Box>
      {showMenu && (
            <Box style={{
              position: "absolute",
              top: y,
              left: x,
              backgroundColor: "#e8e8e8",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              borderRadius:"5px"
            }}>
          <List style={{paddingLeft:"10px"}} spacing={10}> 
          <ListItem>
            <Button
            bg="transparent"
            as={SmallAddIcon} 
            />
            New file...
          </ListItem>
          <ListItem>
            <ListIcon as={SmallAddIcon} color='green.500' />
            New folder...
          </ListItem>
        </List>
        </Box>
    )}
    </Box>
  )
}

export default ContextMenu

