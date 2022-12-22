import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

 type ImageData = {
   image_url: string;
 };

export const imagesAdapter = createEntityAdapter<ImageData>({
  selectId: (item) => item.image_url,
});

const imagesSlice = createSlice({
  name: "images",
  initialState: imagesAdapter.getInitialState([]),
  reducers: {
    imageAdded: imagesAdapter.addOne,
    imageRemoved: imagesAdapter.removeOne,
    imagesDeletedAll: imagesAdapter.removeAll,
  },
});

export const { imageAdded, imageRemoved, imagesDeletedAll } =
  imagesSlice.actions;

export const {
  selectById: selectimageById,
  selectIds: selectimageIds,
  selectEntities: selectimageEntities,
  selectAll: selectAllimages,
  selectTotal: selectTotalimages,
} = imagesAdapter.getSelectors((state: RootState) => state.images);

export default imagesSlice.reducer;