import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "services/firebase";

export const getImageUrl = async (path: string) => {
  const imageRef = ref(storage, path);
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image URL: ", error);
    return null;
  }
};
