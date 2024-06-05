import { Box, Flex, IconButton } from "@chakra-ui/react";
import { CgFileAdd, CgFolderAdd} from "react-icons/cg";

function MiniOption() {
  return (
    <Box borderWidth="0px" borderRadius="lg" p="4">
      <Flex alignItems="flex-statr">
        <IconButton
          aria-label="Thêm file"
          icon={<CgFileAdd />}
          colorScheme="teal"
          variant="outline"
          mr="2"
          border='0px'
          style={{ backgroundColor: 'transparent' }}
        />
        <IconButton
          aria-label="Thêm folder"
          icon={<CgFolderAdd />}
          colorScheme="teal"
          variant="outline"
          border='0px'
          style={{ backgroundColor: 'transparent' }}
        />
      </Flex>
    </Box>
  );
}

export default MiniOption;