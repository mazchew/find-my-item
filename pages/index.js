import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div>
        <h1 className="text-xl font-medium text-gray-800">
          Item Gallery
        </h1>
        <p className="text-gray-500">
          Check out all found items
        </p>
      </div>
    </Layout>
  );
}
