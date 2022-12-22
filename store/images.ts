import { createEntityAdapter, createSlice, createReducer } from "@reduxjs/toolkit";
import { RootState } from ".";

 type ImageData = {
   image_url: string;
 };

// export const imagesAdapter = createEntityAdapter<ImageData>({
//   selectId: (item) => item.image_url,
// });


const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
  },
  reducers: {
    addImage(state, action){state.images = [...state.images, action.payload]},
    deleteImage(state, action){}
    // imageAdded: imagesAdapter.addOne,
    // imageRemoved: imagesAdapter.removeOne,
    // imagesDeletedAll: imagesAdapter.removeAll,
  },
});

export const { addImage } =
  imagesSlice.actions;

// export const {
//   selectById: selectImageById,
//   selectIds: selectImageIds,
//   selectEntities: selectImageEntities,
//   selectAll: selectAllImages,
//   selectTotal: selectTotalImages,
// } = imagesAdapter.getSelectors((state: RootState) => state.images);

export default imagesSlice.reducer;