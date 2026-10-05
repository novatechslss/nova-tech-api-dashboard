import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Currency API',
  icon: '💱',
  category: 'Finance',
  description: 'Real-time currency exchange rates and conversion data.',
  baseUrl: 'https://api.exchangerate-api.com/v4/latest/USD',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function CurrencyPage() {
  return <ApiPageShell config={config} />;
}