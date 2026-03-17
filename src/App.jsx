import Footer from "./components/footer";
import History from "./components/history";
import Button from "./components/button";
import Header from "./components/header";
import LanguageSelector from "./components/language-selector";
import TextContainer from "./components/text-container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLanguages } from "./redux/actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  return (
    <div className="bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 min-h-screen text-white grid place-items-center">
      <div className="mx-auto px-4 w-full py-8">
        <div className="max-w-6xl w-full mx-auto space-y-8">
          <Header />

          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-2xl p-6">
            <LanguageSelector />
            <TextContainer />
            <Button />
          </div>
          <History />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
