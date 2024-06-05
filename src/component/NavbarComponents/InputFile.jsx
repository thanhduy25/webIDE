const InputFile = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
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
