import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'JSON Placeholder API',
  icon: '🎪',
  category: 'Testing',
  description: 'Fake JSON API for prototyping and testing with posts, comments, users.',
  baseUrl: 'https://jsonplaceholder.typicode.com/posts/1',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function JsonPlaceholderPage() {
  return <ApiPageShell config={config} />;
}