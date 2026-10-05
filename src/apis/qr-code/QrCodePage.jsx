import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'QR Code API',
  icon: '📱',
  category: 'Utilities',
  description: 'Generate QR codes from URLs and text data.',
  baseUrl: 'https://api.qrserver.com/v1/generate-qr-code/?size=200x200&data=Hello World',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function QrCodePage() {
  return <ApiPageShell config={config} />;
}