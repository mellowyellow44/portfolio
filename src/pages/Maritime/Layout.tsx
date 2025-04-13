import React, { useState } from 'react';
import { Anchor, Compass, Ship, Navigation, Wind, Map, Award, Briefcase } from 'lucide-react';

interface MaritimeExperience {
  title: string;
  years: string;
  description: string;
  icon: React.ReactNode;
}

interface Certification {
  name: string;
  issuer: string;
  year: number;
}

interface ResumeEntry {
  position: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const MaritimeProfile = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'certifications' | 'resume'>('experience');
  
  const experiences: MaritimeExperience[] = [
    {
      title: "USCG Licensed Captain (100-ton)",
      years: "2008 - Present",
      description: "Hold active 100-ton Near Coastal U.S. Coast Guard Captain's License, maintaining all required certifications and endorsements.",
      icon: <Navigation className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Parasail Business Owner/Operator",
      years: "2020 - 2023",
      description: "Founded and operated parasail businesses in Montana and Seattle, providing memorable experiences while maintaining strict safety standards.",
      icon: <Wind className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Lead Parasail Captain",
      years: "2008 - 2019",
      description: "Operated various parasail vessels in diverse locations including Lake Tahoe, Cayman Islands, US Virgin Islands, and multiple coastal regions. 100% incident-free record.",
      icon: <Ship className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Maritime Safety Consultant",
      years: "2015 - 2019",
      description: "Provided expert consultation for new parasail operations, focusing on safety protocols, crew training, and operational best practices.",
      icon: <Award className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Crew Trainer",
      years: "2010 - 2019",
      description: "Trained numerous crew members and upcoming captains in proper parasailing operations, emergency procedures, and customer service excellence.",
      icon: <Briefcase className="w-6 h-6 text-teal-600" />
    }
  ];
  
  const certifications: Certification[] = [
    {
      name: "USCG 100-Ton Master Captain License (Near Coastal)",
      issuer: "United States Coast Guard",
      year: 2008,
    },
    {
      name: "USCG Medical Certificate",
      issuer: "United States Coast Guard",
      year: 2008,
    },
    {
      name: "STCW Certificate",
      issuer: "International Maritime Organization",
      year: 2011,
    },
    {
      name: "Advanced First Aid/CPR Certification",
      issuer: "American Red Cross",
      year: 2008,
    },
    {
      name: "Open Water Scuba Certification",
      issuer: "PADI",
      year: 2010,
    }
  ];
  
  const resumeEntries: ResumeEntry[] = [
    {
      position: "Parasail Business Owner/Operator",
      company: "Owner/Operator",
      location: "Montana and Seattle, WA",
      period: "2020 - 2023",
      description: [
        "Founded and operated parasail businesses in two distinct locations",
        "Managed all aspects including equipment maintenance, crew training, and customer service",
        "Maintained 100% safety record while providing memorable water experiences",
        "Navigated business operations through challenging economic conditions"
      ]
    },
    {
      position: "Lead Parasail Captain",
      company: "Action Water-Sports",
      location: "South Lake Tahoe, CA",
      period: "May 2019 - October 2019",
      description: [
        "Drove a 31' Ocean Pro on the South Side of Lake Tahoe in highly variable wind conditions",
        "Trained several new crew members",
        "Completed seasonal position with incident-free record"
      ]
    },
    {
      position: "Lead Parasail Captain",
      company: "Action Water-Sports",
      location: "Incline Village, NV",
      period: "May 2018 - October 2018",
      description: [
        "Drove a 31' Ocean Pro on the North Side of Lake Tahoe in highly variable wind conditions",
        "Trained several new crew members",
        "Completed seasonal position with incident-free record"
      ]
    },
    {
      position: "Lead Parasail Captain",
      company: "Fantasea Watersports",
      location: "Cayman Islands",
      period: "February 2017 - November 2018",
      description: [
        "Drove 31' Ocean Pro and 28' Premium for new business",
        "Operated in typically offshore wind conditions off Grand Cayman",
        "Maintained incident-free operation record"
      ]
    },
    {
      position: "Lead Parasail Captain",
      company: "Multiple Locations",
      location: "Various",
      period: "2008 - 2017",
      description: [
        "Worked for California Parasail (locations on Catalina Island, Lake Tahoe, and Newport Beach) for 6 years",
        "Primarily operated 35' and 30' Centurions in extremely high volume settings",
        "Trained countless crew and office staff, as well as up-and-coming captains",
        "Additional captain experience in US Virgin Islands, Roatan-Honduras, Canada, Florida, and Washington",
        "Consulted on 3 successful parasail business start-ups",
        "Maintained 100% incident-free record throughout career"
      ]
    },
    {
      position: "Parasail Crew",
      company: "Multiple Locations",
      location: "Various",
      period: "2004 - 2007",
      description: [
        "Started crewing in US Virgin Islands for Caribbean Parasail for 3 years",
        "Crewed a summer in Ocean City, MD for OC Parasail",
        "Maintained incident-free record"
      ]
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Header */}
      <div className="bg-white py-10 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Anchor className="w-8 h-8 mr-3 text-teal-600" />
              <div>
                <h1 className="text-3xl font-bold tracking-wide text-gray-900">MARITIME PROFILE</h1>
                <p className="text-gray-600 mt-1">Alan Campbell • USCG Licensed Captain (100-ton)</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center">
              <Compass className="w-6 h-6 text-teal-600 mr-2" />
              <span className="text-gray-600 font-medium">USCG Licensed Captain (100-ton) since 2008</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === 'experience' 
                  ? 'border-teal-600 text-teal-600' 
                  : 'border-transparent hover:text-gray-700'
              }`}
            >
              Experience
            </button>
            <button 
              onClick={() => setActiveTab('certifications')}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === 'certifications' 
                  ? 'border-teal-600 text-teal-600' 
                  : 'border-transparent hover:text-gray-700'
              }`}
            >
              Certifications
            </button>
            <button 
              onClick={() => setActiveTab('resume')}
              className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                activeTab === 'resume' 
                  ? 'border-teal-600 text-teal-600' 
                  : 'border-transparent hover:text-gray-700'
              }`}
            >
              Parasail Resume
            </button>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'experience' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow border border-gray-100">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-gray-100 rounded-lg mr-4">
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-500">{exp.years}</p>
                  </div>
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'certifications' && (
          <div className="bg-white rounded-lg p-6 shadow border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2 text-gray-900">Professional Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-teal-600 mt-1 mr-3" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{cert.name}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="md:text-right mt-2 md:mt-0">
                    <p className="text-gray-700">Issued: {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'resume' && (
          <div className="bg-white rounded-lg p-6 shadow border border-gray-100">
            <div className="flex items-center mb-6 border-b border-gray-200 pb-2">
              <Briefcase className="w-6 h-6 text-teal-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Mariner Career History</h2>
            </div>
            
            <div className="space-y-8">
              {resumeEntries.map((entry, index) => (
                <div key={index} className="border-l-4 border-teal-600 pl-5 pb-1">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{entry.position}</h3>
                    <span className="text-gray-500 font-medium">{entry.period}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-700 font-medium">{entry.company}</span>
                    <span className="mx-2">|</span>
                    <span className="text-gray-600">{entry.location}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {entry.description.map((point, idx) => (
                      <li key={idx} className="text-gray-700">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Career Highlights</h3>
              <ul className="list-disc list-outside ml-4 space-y-2">
                <li className="text-gray-700">100-ton USCG Licensed Captain (Near Coastal) since 2008</li>
                <li className="text-gray-700">Over 15 years of professional maritime experience in parasailing operations</li>
                <li className="text-gray-700">Consistent 100% safety record throughout entire career</li>
                <li className="text-gray-700">Successfully operated personal parasail businesses in Montana and Seattle (2020-2023)</li>
                <li className="text-gray-700">Experience in diverse water conditions across multiple countries and regions</li>
                <li className="text-gray-700">Extensive crew training and business consulting experience</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      {/* <footer className="mt-12 bg-white py-6 text-center text-gray-600 border-t border-gray-200">
        <p>Member of International Maritime Association since 2010</p>
        <p className="mt-2 text-sm">© {new Date().getFullYear()} Alan Campbell - Maritime Professional</p>
      </footer> */}
    </div>
  );
};

export default MaritimeProfile;