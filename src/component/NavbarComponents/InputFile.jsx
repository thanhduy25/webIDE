import { useSelector, useDispatch } from 'react-redux';
import { updateTree } from '../../store/treeSlice.js';
import { useToast } from '@chakra-ui/react'

const InputFile = () => {
  const toast = useToast()
  //upload file to tree
  const dispatch = useDispatch();
  const { treeDirectory } = useSelector(state => state.tree);
  //handle 
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        const newItem = {
          id: null,
          name: file.name,
          path: file.name,
          content: fileData.split(",")[1]
        }
        dispatch(updateTree([...treeDirectory, newItem]));
        toast({
          position: 'top',
          title: 'File upload successful!',
          description: "File was saved",
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <input
      id="fileInput"
      type="file"
      style={{ display: "none" }}
      onChange={handleFileChange}
    />
  );
};

export default InputFile;
