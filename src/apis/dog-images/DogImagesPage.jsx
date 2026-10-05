import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Dog Images API',
  icon: '🐕',
  category: 'Images',
  description: 'Random dog images and breeds with multiple format options.',
  baseUrl: 'https://dog.ceo/api/breeds/image/random',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function DogImagesPage() {
  return <ApiPageShell config={config} />;
}