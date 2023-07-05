import axios from "axios";

export const postMeme = async (fileUrl, { username, avatar }) => {
  try {
    const res = await axios.post('/api/memes', { imageUrl: fileUrl, username: username, avatar: avatar });
    const newMeme = res.data;

    return newMeme;
  } catch (err) {
    return (err);
  }
}

export const deleteMeme = async (memeId) => {
    try {
        await axios.delete(`/api/memes/${memeId}`);
    } catch (err) {
        return err;
    }
}