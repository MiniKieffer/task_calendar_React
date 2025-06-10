import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const CalenderPage = lazy(() => import('@/pages/calendar'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<CalenderPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
