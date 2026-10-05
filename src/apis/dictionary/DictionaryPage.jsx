import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Dictionary API',
  icon: '📖',
  category: 'Language',
  description: 'Word definitions, pronunciations, and etymologies.',
  baseUrl: 'https://api.dictionaryapi.dev/api/v2/entries/en/hello',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function DictionaryPage() {
  return <ApiPageShell config={config} />;
}