import Header from './assets/components/Header'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './assets/pages/Home'
import Footer from './assets/components/Footer'
import Watch from './assets/components/Watch'
import AllVideos from './assets/components/AllVideos'
import ScrollToTop from './assets/components/ScrollToTop'
import Terms from './assets/pages/Terms'
import Contact from './assets/pages/Contact'
import SearchPage from './assets/pages/SearchPage'
import NewsDetails from './assets/components/NewsDetails'
import Biography from './assets/components/Biography'
import AllNews from './assets/components/AllNews';
import ContentCreator from './assets/components/ContentCreator';
import Banner from './assets/components/Banner'
import Admin from './assets/admin_form/Admin'
function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ['/contact', '/admin']; 
  const hideFooterAndBannerRoutes = ['/admin']; 
  const hideBannerRoutes = ['/search']; 
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  const shouldHideBanner = hideBannerRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/contella" element={<Home />} />
        <Route path="/contella/contact" element={<Contact />} />
        <Route path="/contella/videos" element={<AllVideos />} />
        <Route path="/contella/news" element={<AllNews />} />
        <Route path="/contella/creators" element={<ContentCreator />} />
        <Route path="/contella/search" element={<SearchPage />} />
        <Route path="/contella/termsandconditions" element={<Terms />} />
        <Route path="/contella/watch/:id" element={<Watch />} />
        <Route path="/contella/news/:id" element={<NewsDetails />} />
        <Route path="/contella/creator/:id" element={<Biography />} />
        <Route path="/contella/admin" element={<Admin />} />

      </Routes>

      {!shouldHideBanner && !shouldHideFooter && <Banner />}
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
