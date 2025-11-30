import React from 'react';

const clients = [
    { name: 'Tejimandi', id: '1dTW885-NnXXAf4JBuYoCxIW3rHcLMaZU' },
    { name: 'The Media Guru', id: '1ia9WgcWxIPG6B29FfLdSs5w7Y0CWgbaV' },
    { name: 'Spotlight', id: '1FFdBRjbaD8MoDwq8gtYSc4Uh95oTrO6V' },
    { name: 'Xpertology', id: '1tbUXAZxk8hEWuySUBeh8cvlP8YJWA9M0' },
    { name: 'Arvelo Media', id: '1qerOsP35k92_TKAw5PMQsZmS-5VTPWeL' },
    { name: 'English Yaari', id: '1u-VNtrl9xq5Y6cR1LQRvy_tmkj44QyxB' },
    { name: 'AIWO', id: '1LaaUYhpMqJZSiyMu-XnsdAu7vR0ga-sN' },
    { name: 'Mysivi', id: '1c0RjTsAHAVeyy3NRLr30gqhl7rtl-V8Y' },
    { name: 'Techealer', id: '1Whyi5uaubDkSnt3ax7O9ycLtMuPcJiAf' },
    { name: 'Zam Zam Sweets', id: '1RHCqY3ZeS-iTy-FiaRO_-WcQiS0Gs1bH' },
    { name: 'Zooq Films', id: '1rBK48BaOyXkBGXrp1KvxPYecH_-p7V9_' },
    { name: 'Forza Fitness', id: '1fhNIAOdQpAc7aWEFZUA0u9XSJSUqyzG5' },
    { name: 'WIW Roofing', id: '1U69elelFMNWmCmHFyo0fOPwuAQfIYhcc' },
    { name: 'Figment', id: '1A7krfXj6fPZeXvKw6oDQ-0-GRucPRv43' },
    { name: 'Naraya Pearls', id: '1JsL_HKXpLln1HEkRyIEkErTvzc7DbStW' },
    { name: 'Therapy', id: '1MS8HgI12RVlyxaLLRCsXzxdb0mcsQgT9' },
    { name: 'Lesgo', id: '1OwPXIrlpQ8pcnf62OacGSMQrcMXB9jGG' },
    { name: 'Royal Crest', id: '1V04YscdXYszkIsvs9LqTQmha8-I9GsZV' },
    { name: 'Vigaah Study Abroad', id: '1HDoeP84JYRIGyWv_Tu0Lr7_j3AxMGUhU' },
    { name: 'Eleven Fitness Club', id: '1zlp6xF8sfR7WaD99lIqYbNWLD97fjJWf' },
    { name: 'Zhagaram', id: '1kbVA1nkuTtlJTm7rtsn2Di3Zy-NULH4J' },
    { name: 'Greensigma', id: '1JzZLy8RmNq4eCNFSd8tp3fGBJH4dP55p' },
    { name: 'Aire', id: '1iiMkid3VlvTeEw_aouZYKb29cIQolvoJ' },
    { name: 'Flancer', id: '1MRVwBevTf0mpLbgtTc0QA9Eqmmx1F4UM' },
];

const displayClients = [...clients, ...clients];

const Clients: React.FC = () => {
  return (
    <section id="clients" className="py-16 md:py-24 bg-[#08080c] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 text-center mb-8 md:mb-12">
        <h2 className="text-xs md:text-sm font-mono text-creativeBlue mb-2 uppercase tracking-widest">08. Our Clients</h2>
      </div>
      
      <div 
        className="w-full overflow-hidden"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="w-max flex animate-scroll hover:pause">
          {displayClients.map((client, index) => (
            <div 
              key={`${client.id}-${index}`}
              className="mx-4 md:mx-8 flex items-center justify-center h-28 w-32 md:w-44"
              title={client.name}
            >
              <img 
                src={`https://lh3.googleusercontent.com/d/${client.id}`} 
                alt={client.name}
                loading="lazy"
                className="max-h-16 max-w-full object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;