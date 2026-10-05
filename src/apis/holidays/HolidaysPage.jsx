import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Public Holidays API',
  icon: '🎉',
  category: 'Calendar',
  description: 'Public holiday dates and information by country and year.',
  baseUrl: 'https://date.nager.at/api/v3/publicholidays/2024/US',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function HolidaysPage() {
  return <ApiPageShell config={config} />;
}