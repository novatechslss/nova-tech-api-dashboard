import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'IP Info API',
  icon: '🌐',
  category: 'Network',
  description: 'Public IP address lookup with geolocation and ISP details.',
  baseUrl: 'https://ipapi.co/json/',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function IpInfoPage() {
  return <ApiPageShell config={config} />;
}