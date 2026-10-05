import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Country Info API',
  icon: '🌍',
  category: 'Geography',
  description: 'Detailed country information including capitals, currencies, and languages.',
  baseUrl: 'https://restcountries.com/v3.1/all',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function CountryInfoPage() {
  return <ApiPageShell config={config} />;
}