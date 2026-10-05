import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Time Zone API',
  icon: '🕐',
  category: 'Time',
  description: 'Timezone information and time conversions for any location.',
  baseUrl: 'https://worldtimeapi.org/api/timezone/America/New_York',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function TimezonePage() {
  return <ApiPageShell config={config} />;
}