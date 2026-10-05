import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Spaceflight News API',
  icon: '🚀',
  category: 'News',
  description: 'Latest spaceflight articles, launches, and space news updates.',
  baseUrl: 'https://api.spaceflightnewsapi.net/v4/articles/',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function SpaceflightNewsPage() {
  return <ApiPageShell config={config} />;
}