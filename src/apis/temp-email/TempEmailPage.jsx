import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Temp Email API',
  icon: '📧',
  category: 'Email',
  description: 'Disposable email service with metadata and email refresh capabilities.',
  baseUrl: 'https://tempemailapi-woad.vercel.app/api',
  methods: ['GET', 'POST'],
  sampleEndpoint: '/',
  timeout: 12000,
  parameters: [
    { name: 'endpoint', description: 'API endpoint path' },
  ],
};

export default function TempEmailPage() {
  return <ApiPageShell config={config} />;
}