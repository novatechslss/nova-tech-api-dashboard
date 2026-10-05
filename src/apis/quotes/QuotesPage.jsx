import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Quotes API',
  icon: '✨',
  category: 'Quotes',
  description: 'Inspirational and famous quotes from notable people.',
  baseUrl: 'https://api.quotable.io/random',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function QuotesPage() {
  return <ApiPageShell config={config} />;
}