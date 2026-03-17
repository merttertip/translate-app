import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  sourceLang: { label: "Dili algıla", value: undefined }, // kaynak dil
  targetLang: { label: "English", value: "en" }, // hedef dil
  textToTranslate: "", // çevrilecek metin
  translatedText: "", // çeviri sonucu
  isLoading: false, // çeviri yükleniyor mu
  error: null, // çeviri anında hata oluştu mu
  history: [], // çeviri geçmişini tutar
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setSourceLang: (state, { payload }) => {
      state.sourceLang = payload;
    },
    setTargetLang: (state, { payload }) => {
      state.targetLang = payload;
    },
    setText: (state, { payload }) => {
      state.textToTranslate = payload;
    },
    swap: (state) => {
      // değişme anında state'ler birbirini ezmesin diye geçici değişkenler oluştur
      const tempSource = state.sourceLang;
      const tempTarget = state.targetLang;
      const tempText = state.textToTranslate;
      const tempTranslated = state.translatedText;

      // state'lerin yerini değiştir
      state.sourceLang = tempTarget;
      state.targetLang = tempSource;
      state.textToTranslate = tempTranslated;
      state.translatedText = tempText;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
      state.translatedText = "";
    });
    builder.addCase(translateText.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });
    builder.addCase(translateText.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.translatedText = payload;

      // çeviri sonucu geldiyse geçmişe kaydet
      if (state.textToTranslate && payload) {
        state.history.unshift({
          id: Date.now(),
          textToTranslate: state.textToTranslate,
          translatedText: payload,
          sourceLang: state.sourceLang.label,
          targetLang: state.targetLang.label,
          timestamp: new Date().getTime(),
        });
      }
    });
  },
});

export const { setSourceLang, setTargetLang, setText, swap, clearHistory } =
  translateSlice.actions;

export default translateSlice.reducer;
