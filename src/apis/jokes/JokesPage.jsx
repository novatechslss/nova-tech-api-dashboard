import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Jokes API',
  icon: '😂',
  category: 'Fun',
  description: 'Programming and general jokes with multiple categories.',
  baseUrl: 'https://official-joke-api.appspot.com/random_joke',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function JokesPage() {
  return <ApiPageShell config={config} />;
}