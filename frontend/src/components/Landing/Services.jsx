import React from 'react';

const Services = () => {
    return (
        <section id="services" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-primary mb-8">How It Works</h2>
                {/* Placeholder for services content */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
                        <h3 className="text-2xl font-bold mb-4">1. Input Text</h3>
                        <p className="text-gray-600">Enter any Algerian text (Darja, mixed French/Arabic) into the analyzer.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-left">
                        <h3 className="text-2xl font-bold mb-4">2. AI Processing</h3>
                        <p className="text-gray-600">Our Gemini-powered engine scans for neologisms, loanwords, and hybrid terms.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
