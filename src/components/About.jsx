export default function About() {
  return (
    <section id="about" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-8 space-y-8 md:space-y-0">
        <img src="https://images.pexels.com/photos/8376269/pexels-photo-8376269.jpeg" alt="Medical Team" className="rounded-lg shadow-lg w-full md:w-1/2 animate-fadeInLeft" />
        <div className="md:w-1/2 text-center md:text-left animate-fadeInRight">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            DocPortal is dedicated to making healthcare accessible to all. Our online platform connects patients with verified and experienced medical professionals — all from the comfort of your home.
          </p>
        </div>
      </div>
    </section>
  );
}
