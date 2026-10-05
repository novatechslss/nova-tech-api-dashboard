import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'URL Metadata API',
  icon: '🔗',
  category: 'Web',
  description: 'Extract metadata from URLs including titles, descriptions, and images.',
  baseUrl: 'https://api.microlink.io/?url=https://novatechslss.github.io',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function UrlMetadataPage() {
  return <ApiPageShell config={config} />;
}