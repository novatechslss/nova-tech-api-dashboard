import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'GitHub API',
  icon: '🐙',
  category: 'Developer',
  description: 'GitHub public repository and user data via official API.',
  baseUrl: 'https://api.github.com/users/github',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function GithubPage() {
  return <ApiPageShell config={config} />;
}