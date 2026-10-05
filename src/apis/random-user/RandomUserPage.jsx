import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Random User API',
  icon: '👤',
  category: 'Users',
  description: 'Generate random user profiles with names, emails, and avatars.',
  baseUrl: 'https://randomuser.me/api/',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function RandomUserPage() {
  return <ApiPageShell config={config} />;
}