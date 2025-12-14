import React from 'react';
import { Database, Brain, Globe } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-secondary" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2 break-words">{title}</h3>
        <p className="text-gray-500 leading-relaxed break-words">{description}</p>
    </div>
);

const About = () => {
    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Why AlgerLex?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Understanding the rapid evolution of the Algerian linguistic landscape through technology.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Feature
                        icon={Brain}
                        title="AI Recognition"
                        description="Powered by Gemini 2.0 to detect hybrid words mixing Darja, French, and English instantly."
                    />
                    <Feature
                        icon={Database}
                        title="Dynamic Lexicon"
                        description="A growing database of neologisms, curated by researchers and validated by the community."
                    />
                    <Feature
                        icon={Globe}
                        title="Cultural Context"
                        description="Goes beyond translation to explain the socio-cultural context of every term."
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
