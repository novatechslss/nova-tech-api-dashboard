import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Weather API',
  icon: '🌤️',
  category: 'Weather',
  description: 'Current weather data and forecasts for locations worldwide.',
  baseUrl: 'https://api.weatherapi.com/v1/current.json',
  methods: ['GET'],
  sampleEndpoint: '?key=demo&q=London',
  timeout: 12000,
  parameters: [
    { name: 'key', description: 'API key (demo key included)' },
    { name: 'q', description: 'Query location' },
  ],
};

export default function WeatherPage() {
  return <ApiPageShell config={config} />;
}