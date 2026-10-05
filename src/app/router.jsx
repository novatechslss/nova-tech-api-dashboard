import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/Home';
import AllApisPage from '../pages/AllApis/AllApis';
import ApiMonitorPage from '../pages/ApiMonitor/ApiMonitor';
import DocumentationPage from '../pages/Documentation/Documentation';
import RestExamplesPage from '../pages/RestExamples/RestExamples';
import SettingsPage from '../pages/Settings/Settings';
import TempEmailPage from '../apis/temp-email/TempEmailPage';
import WeatherPage from '../apis/weather/WeatherPage';
import CountryInfoPage from '../apis/country-info/CountryInfoPage';
import CurrencyPage from '../apis/currency/CurrencyPage';
import TimezonePage from '../apis/timezone/TimezonePage';
import IpInfoPage from '../apis/ip-info/IpInfoPage';
import HolidaysPage from '../apis/holidays/HolidaysPage';
import GithubPage from '../apis/github/GithubPage';
import JsonPlaceholderPage from '../apis/json-placeholder/JsonPlaceholderPage';
import RandomUserPage from '../apis/random-user/RandomUserPage';
import CatFactsPage from '../apis/cat-facts/CatFactsPage';
import DogImagesPage from '../apis/dog-images/DogImagesPage';
import JokesPage from '../apis/jokes/JokesPage';
import QuotesPage from '../apis/quotes/QuotesPage';
import DictionaryPage from '../apis/dictionary/DictionaryPage';
import RestCountriesPage from '../apis/rest-countries/RestCountriesPage';
import SpaceflightNewsPage from '../apis/spaceflight-news/SpaceflightNewsPage';
import OpenLibraryPage from '../apis/open-library/OpenLibraryPage';
import QrCodePage from '../apis/qr-code/QrCodePage';
import UrlMetadataPage from '../apis/url-metadata/UrlMetadataPage';

export const apiCatalog = [
  { name: 'Temp Email', description: 'Disposable email and metadata APIs', icon: '📧', category: 'Email', route: '/apis/temp-email', status: 'online' },
  { name: 'Weather', description: 'Current weather and forecasts', icon: '🌤️', category: 'Weather', route: '/apis/weather', status: 'online' },
  { name: 'Country Info', description: 'Country details and metadata', icon: '🌍', category: 'Geography', route: '/apis/country-info', status: 'online' },
  { name: 'Currency', description: 'Live exchange rates', icon: '💱', category: 'Finance', route: '/apis/currency', status: 'online' },
  { name: 'Time Zone', description: 'Timezone and time conversions', icon: '🕒', category: 'Time', route: '/apis/timezone', status: 'online' },
  { name: 'IP Info', description: 'Public IP lookup details', icon: '🌐', category: 'Network', route: '/apis/ip-info', status: 'online' },
  { name: 'Holidays', description: 'Public holiday data', icon: '🎉', category: 'Calendar', route: '/apis/holidays', status: 'online' },
  { name: 'GitHub', description: 'GitHub public repository and user data', icon: '🐙', category: 'Developer', route: '/apis/github', status: 'online' },
  { name: 'JSON Placeholder', description: 'Fake JSON API for prototyping', icon: '🧪', category: 'Testing', route: '/apis/json-placeholder', status: 'online' },
  { name: 'Random User', description: 'Random user generator', icon: '👤', category: 'Users', route: '/apis/random-user', status: 'online' },
  { name: 'Cat Facts', description: 'Cat facts and fun facts', icon: '🐱', category: 'Fun', route: '/apis/cat-facts', status: 'online' },
  { name: 'Dog Images', description: 'Dog image collection', icon: '🐕', category: 'Images', route: '/apis/dog-images', status: 'online' },
  { name: 'Jokes', description: 'Programming and general jokes', icon: '😂', category: 'Fun', route: '/apis/jokes', status: 'online' },
  { name: 'Quotes', description: 'Inspirational quotes', icon: '✨', category: 'Quotes', route: '/apis/quotes', status: 'online' },
  { name: 'Dictionary', description: 'Word definitions and meanings', icon: '📘', category: 'Language', route: '/apis/dictionary', status: 'online' },
  { name: 'REST Countries', description: 'Country list and data', icon: '🗺️', category: 'Geography', route: '/apis/rest-countries', status: 'online' },
  { name: 'Spaceflight News', description: 'Latest spaceflight articles', icon: '🚀', category: 'News', route: '/apis/spaceflight-news', status: 'online' },
  { name: 'Open Library', description: 'Books, authors, and metadata', icon: '📚', category: 'Books', route: '/apis/open-library', status: 'online' },
  { name: 'QR Code', description: 'Generate QR codes', icon: '📱', category: 'Utilities', route: '/apis/qr-code', status: 'online' },
  { name: 'URL Metadata', description: 'Page metadata extraction', icon: '🔗', category: 'Web', route: '/apis/url-metadata', status: 'online' },
];

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/all-apis" element={<AllApisPage />} />
      <Route path="/api-monitor" element={<ApiMonitorPage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/rest-examples" element={<RestExamplesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/apis/temp-email" element={<TempEmailPage />} />
      <Route path="/apis/weather" element={<WeatherPage />} />
      <Route path="/apis/country-info" element={<CountryInfoPage />} />
      <Route path="/apis/currency" element={<CurrencyPage />} />
      <Route path="/apis/timezone" element={<TimezonePage />} />
      <Route path="/apis/ip-info" element={<IpInfoPage />} />
      <Route path="/apis/holidays" element={<HolidaysPage />} />
      <Route path="/apis/github" element={<GithubPage />} />
      <Route path="/apis/json-placeholder" element={<JsonPlaceholderPage />} />
      <Route path="/apis/random-user" element={<RandomUserPage />} />
      <Route path="/apis/cat-facts" element={<CatFactsPage />} />
      <Route path="/apis/dog-images" element={<DogImagesPage />} />
      <Route path="/apis/jokes" element={<JokesPage />} />
      <Route path="/apis/quotes" element={<QuotesPage />} />
      <Route path="/apis/dictionary" element={<DictionaryPage />} />
      <Route path="/apis/rest-countries" element={<RestCountriesPage />} />
      <Route path="/apis/spaceflight-news" element={<SpaceflightNewsPage />} />
      <Route path="/apis/open-library" element={<OpenLibraryPage />} />
      <Route path="/apis/qr-code" element={<QrCodePage />} />
      <Route path="/apis/url-metadata" element={<UrlMetadataPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
