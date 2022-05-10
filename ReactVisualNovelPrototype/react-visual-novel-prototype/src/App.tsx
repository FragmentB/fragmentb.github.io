import React from 'react';
import TitleScreen from 'components/title-screen/TitleScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OptionScreen from 'components/option-screen/OptionScreen';
import Gallery from 'components/gallery/Gallery';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import GameScreen from 'components/game-screen/GameScreen';
import SaveScreen from 'components/save-screen/SavingScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TitleScreen />} />
        <Route path='option' element={<OptionScreen />} />
        <Route path='game' element={<GameScreen />} />
        <Route path='gallery' element={<Gallery />} />
        <Route path='save' element={<SaveScreen />} />
        <Route path='load' element={<LoadingScreen/>} />
        <Route path='*' element={<TitleScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
