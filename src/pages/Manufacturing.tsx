import { Layout } from "@/components/Layout";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Manufacturing = () => {
  return (
    <Layout>
      <WhatsAppButton />
      <section className="bg-white pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-[#2c0a71] mb-4">
            Industrie Manufacturière
          </h1>
          <p className="text-foreground/70 text-sm md:text-lg max-w-3xl mx-auto">
            Page en cours de construction.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Manufacturing;
