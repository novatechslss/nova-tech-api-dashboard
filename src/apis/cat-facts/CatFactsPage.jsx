import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Cat Facts API',
  icon: '😺',
  category: 'Fun',
  description: 'Random cat facts and fun trivia about cats.',
  baseUrl: 'https://catfact.ninja/fact',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function CatFactsPage() {
  return <ApiPageShell config={config} />;
}