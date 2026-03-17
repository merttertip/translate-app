import { ArrowRight, Volume2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../redux/slices/translate-slice";
import Loader from "./loader";

const TextContainer = () => {
  const { isLoading, sourceLang, targetLang, textToTranslate, translatedText } =
    useSelector((store) => store.translateReducer);
  const dispatch = useDispatch();

  // çevrilecek metni temizle
  const handleClear = () => {
    dispatch(setText(""));
  };

  // çeviri sonucunu kopyala
  const handleCopy = () => {
    window.navigator.clipboard.writeText(translatedText);
  };

  // kaynak metni seslendir
  const handleSpeakSource = () => {
    // devam eden bir seslendirme varsa durdur
    window.speechSynthesis.cancel();

    // SpeechSynthesisUtterance: seslendirilecek metni ve ayarlarını tutan bir nesne oluşturur
    const utterance = new SpeechSynthesisUtterance(textToTranslate);

    // utterance.lang: hangi dilde / aksanda konuşulacağını belirle
    if (sourceLang.value) {
      utterance.lang = sourceLang.value;

      // oluşturulan utterance nesnesini seslendirmeye başla
      // tarayıcının ses sentezleme motorunu kullanarak metni sesli olarak okur
      window.speechSynthesis.speak(utterance);
    }
  };

  // hedef metni seslendir
  const handleSpeakTarget = () => {
    // devam eden bir seslendirme varsa durdur
    window.speechSynthesis.cancel();

    // SpeechSynthesisUtterance: seslendirilecek metni ve ayarlarını tutan bir nesne oluşturur
    const utterance = new SpeechSynthesisUtterance(translatedText);

    // utterance.lang: hangi dilde / aksanda konuşulacağını belirle
    if (targetLang.value) {
      utterance.lang = targetLang.value;

      // oluşturulan utterance nesnesini seslendirmeye başla
      // tarayıcının ses sentezleme motorunu kullanarak metni sesli olarak okur
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex gap-4 mt-6 lg:gap-8 flex-col lg:flex-row">
      {/* çevrilecek metin */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-zinc-300">Çevirilicek Metin</label>

          <div className="flex items-center gap-3">
            <button onClick={handleSpeakSource} className="btn">
              <Volume2 className="size-4" />
              Seslendir
            </button>
            <button onClick={handleClear} className="btn">
              Temizle
            </button>
          </div>
        </div>
        <div>
          <textarea
            maxLength={500}
            value={textToTranslate}
            onChange={(e) => dispatch(setText(e.target.value))}
            placeholder="Çevirmek istediğiniz metni buraya yazınız"
          ></textarea>
        </div>
      </div>
      {/* Ok */}
      <div className="flex items-center justify-center lg:flex-col">
        <div className="size-8 lg:size-12 bg-linear-to-r from-red-600 to-yellow-600  hover:from-red-700 hover:to-yellow-700 rounded-full grid place-items-center">
          <ArrowRight className="size-4 lg:size-6 max-lg:rotate-90" />
        </div>
      </div>
      {/* Çeviri Sonucu */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-zinc-300">Çeviri Sonucu</label>

          <div className="flex items-center gap-3">
            <button onClick={handleSpeakTarget} className="btn">
              <Volume2 className="size-4" />
              Seslendir
            </button>
            <button onClick={handleCopy} className="btn">
              Kopyala
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea className="text-gray-300" disabled value={translatedText} />

          {/* todo:loader */}
          {isLoading && <Loader />}

          {!isLoading && !translatedText && !textToTranslate.trim() && (
            <div className="absolute inset-0 grid place-items-center">
              <p className="text-zinc-500 text-sm">Çeviri bekleniyor...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextContainer;
