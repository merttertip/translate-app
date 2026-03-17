import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//dil verisini api'dan alan thunk aksiyonu
// çağrıldığında api'ın cevabına göre otomatik olarak reducer'a haber veririr
export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    // api'dan dil verilerini al
    const res = await api.get("/languages");

    // aksiyonun payload'ını return et
    return res.data.languages;
  },
);

// çeviri işlemi için api'a istek atıcak thunk aksiyonu
export const translateText = createAsyncThunk(
  "translate/translateText",
  async (_, { getState }) => {
    // store'da tutulan verilere eriş
    const state = getState().translateReducer;

    // api'a çeviri için istek at
    const res = await api.post("", {
      q: state.textToTranslate,
      source: state.sourceLang.value,
      target: state.targetLang.value,
    });

    // aksiyonun payload'ını return et
    return res.data.data.translations.translatedText[0];
  },
);
