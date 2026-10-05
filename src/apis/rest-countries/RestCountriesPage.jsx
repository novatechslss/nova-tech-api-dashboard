import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'REST Countries API',
  icon: '🗺️',
  category: 'Geography',
  description: 'Comprehensive country list with flags, currencies, and demographics.',
  baseUrl: 'https://restcountries.com/v3.1/all',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function RestCountriesPage() {
  return <ApiPageShell config={config} />;
}