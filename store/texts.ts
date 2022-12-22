import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

 type TextData = {
   text_id: number;
   text_url: string;
 };

export const textsAdapter = createEntityAdapter<TextData>({
  selectId: (item) => item.text_id,
});

const textsSlice = createSlice({
  name: "texts",
  initialState: textsAdapter.getInitialState({}),
  reducers: {
    textAdded: textsAdapter.addOne,
    textRemoved: textsAdapter.removeOne,
    textsDeletedAll: textsAdapter.removeAll,
  },
});

export const { textAdded, textRemoved, textsDeletedAll } =
  textsSlice.actions;

export const {
  selectById: selecttextById,
  selectIds: selecttextIds,
  selectEntities: selecttextEntities,
  selectAll: selectAlltexts,
  selectTotal: selectTotaltexts,
} = textsAdapter.getSelectors((state: RootState) => state.texts);

export default textsSlice.reducer;