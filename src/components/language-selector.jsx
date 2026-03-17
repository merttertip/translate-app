import { ArrowLeftRight } from "lucide-react";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactSelect from "react-select";
import { selectStyles } from "../utils/constants";
import {
  setSourceLang,
  setTargetLang,
  swap,
} from "../redux/slices/translate-slice";

const LanguageSelector = () => {
  const { isLoading, error, languages } = useSelector(
    (store) => store.languageReducer,
  );
  const { sourceLang, targetLang } = useSelector(
    (store) => store.translateReducer,
  );

  const dispatch = useDispatch();

  // store'daki languages dizisindeki keyleri react-select'in istediği şekilde güncelle
  // language > value
  // name > label
  const formatted = useMemo(
    () =>
      languages.map((item) => ({
        value: item.language,
        label: item.name,
      })),
    [languages],
  );

  // dili algıla seçeneği
  const detect = { label: "Dili algıla", value: undefined };

  // değiştirme
  const handleSwap = () => {
    dispatch(swap());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-col lg:flex-row">
        {/* kaynak dil */}
        <div className="flex-1 w-full">
          <label className="text-sm text-zinc-300 block mb-2">Kaynak Dil</label>
          <ReactSelect
            isDisabled={isLoading}
            isLoading={isLoading}
            options={[detect, ...formatted]}
            value={sourceLang}
            styles={selectStyles}
            onChange={(lang) => {
              if (lang.value === targetLang.value) {
                return handleSwap();
              }

              dispatch(setSourceLang(lang));
            }}
            className="text-black"
          />
        </div>

        {/* değiştirme butonu */}
        <div className="flex justify-center items-center">
          <button
            onClick={handleSwap}
            className="size-10 lg:size-12 bg-zinc-700 rounded-full flex justify-center items-center disabled:opacity-50"
          >
            <ArrowLeftRight className="size-5" />
          </button>
        </div>

        {/* hedef dil */}
        <div className="flex-1 w-full">
          <label className="text-sm text-zinc-300 block mb-2">Hedef Dil</label>
          <ReactSelect
            isDisabled={isLoading}
            isLoading={isLoading}
            options={formatted}
            value={targetLang}
            styles={selectStyles}
            onChange={(lang) => {
              if (lang.value === sourceLang.value) {
                return handleSwap();
              }

              dispatch(setTargetLang(lang));
            }}
            className="text-black"
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-zinc-500">
          {languages.length} dil destekleniyor
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
