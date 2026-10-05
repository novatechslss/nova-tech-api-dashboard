import ApiPageShell from '../../components/ApiPageShell/ApiPageShell';

const config = {
  name: 'Open Library API',
  icon: '📚',
  category: 'Books',
  description: 'Search books, authors, and bibliographic data from Open Library.',
  baseUrl: 'https://openlibrary.org/api/books?bibkeys=ISBN:0451524934&format=json',
  methods: ['GET'],
  sampleEndpoint: '',
  timeout: 12000,
  parameters: [],
};

export default function OpenLibraryPage() {
  return <ApiPageShell config={config} />;
}