export const validateImage = (file) => {
  let err = null;
  if (!file) err = "Not found file to upload !";
  if (file.size > 1020 * 1024) err = "File must be smaller than 1mb !";
  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Image format is incorrect !";
  return err;
};

//
export const uploadImage = async (images) => {
  let imgArr = [];
  for (let item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", "di6rlga4");
    formData.append("cloud_name", " social-network");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/wonder-place/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
