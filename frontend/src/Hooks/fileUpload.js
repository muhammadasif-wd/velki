

export const fileUpload = async (formData, setUploadURL) => {
  const uploadURL = `http://localhost:5000/api/v1/upload/single-upload`;

  fetch(uploadURL, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Data: ", data);
      if (data.status === "success") {
        console.log("Response:", data);
        setUploadURL(data.url);
      }
    });
};
