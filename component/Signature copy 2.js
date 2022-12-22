const handleData = async () => {
  setLoading(true);
  const formData = new FormData();
  const path = FileSystem.cacheDirectory + "sign.png";
  const file = await FileSystem.getInfoAsync(path);
  console.log(file);

  formData.append("photoFromFront", {
    uri: file.uri,
    name: "photo.png",
    type: "image/png"
  });
  formData.append("documentID", documentID);
  formData.append("date", date);
  formData.append("location", location);
  formData.append("completeFolder", user.folderIds.completeFolderId);
  formData.append("toSignFolder", user.folderIds.toSignFolderId);
  console.log(formData)
  fetch(`${BACKEND_URL}/signature/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    },
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.moveDoc.status === 200) {
        toast.show({
          description: "Le fichier à bien été signé"
        });
      }
      setLoading(false);
      props.fetchToSignDocs();
    });

  setSignatureModal(!signatureModal);
};