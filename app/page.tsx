import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimoni from "@/components/Testimoni";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      {/* Memanggil komponen Hero */}
      <Hero />

      <section className="container mx-auto px-4 py-8">
        <Image
          src="/images/gambar1.png"
          alt="Deskripsi"
          width={1200}
          height={600}
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </section>

      {/* Memanggil komponen Services */}
      <Services />

      {/* Memanggil komponen Testimoni */}
      <Testimoni />
    </main>
  );
}
