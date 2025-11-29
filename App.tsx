import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MapPin, Star, Phone, Mail, Instagram, Linkedin, Search as SearchIcon, ChevronRight, Clock, Award, Users, BookOpen } from 'lucide-react';
import { PROVINCIAL_CASES, NATIONAL_CASES, SERVICES, TESTIMONIALS, COMPANY_INFO, SERVICE_PROCESS, SERVICE_STATS } from './constants';
import AIPlayground from './components/AIPlayground';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState<'intro' | 'culture' | 'history' | 'team' | 'honors'>('intro');

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-shiyuan-dark overflow-x-hidden bg-white">
      
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-shiyuan-red text-white shadow-lg py-3' : 'bg-transparent text-shiyuan-dark py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo placeholder */}
            <h1 className={`text-2xl font-serif font-bold tracking-widest flex items-center gap-2 ${scrolled ? 'text-shiyuan-gold' : 'text-shiyuan-red'}`}>
              <span className="text-3xl">✦</span> 诗远研学
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {['首页', '浙江产品', '全国产品', '服务体系', '关于我们'].map((item, idx) => {
              const ids = ['home', 'provincial', 'national', 'services', 'about'];
              return (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(ids[idx])}
                  className="hover:text-shiyuan-gold transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-shiyuan-gold transition-all group-hover:w-full"></span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full cursor-pointer transition-colors ${scrolled ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
               <SearchIcon size={20} />
            </div>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-shiyuan-light border-t border-gray-200 py-4 px-4 shadow-xl">
             {['首页', '浙江产品', '全国产品', '服务体系', '关于我们'].map((item, idx) => {
              const ids = ['home', 'provincial', 'national', 'services', 'about'];
              return (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(ids[idx])}
                  className="block w-full text-left py-3 text-shiyuan-dark font-medium border-b border-gray-100 last:border-0"
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?random=99" 
            alt="Students in Museum" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-shiyuan-red/90 to-shiyuan-dark/60 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-xl md:text-2xl mb-4 tracking-[0.3em] uppercase text-shiyuan-gold animate-fade-in-up">
            读万卷书 · 行诗意路
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight animate-fade-in-up delay-100">
            一站式研学生态服务商
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light opacity-90 mb-10 leading-relaxed animate-fade-in-up delay-200">
            用体验式教育启发每个孩子的社会实践能力。专注做好教育，追求品质卓越的客户体验。
          </p>
          <button 
            onClick={() => scrollToSection('provincial')}
            className="px-8 py-4 bg-shiyuan-gold text-shiyuan-dark font-bold rounded-sm hover:bg-white transition-colors duration-300 transform hover:-translate-y-1 shadow-lg flex items-center gap-2 mx-auto"
          >
            探索行程 <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Provincial Cases */}
      <section id="provincial" className="py-24 bg-shiyuan-light/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-shiyuan-red/20 pb-4">
            <div>
              <span className="text-shiyuan-red font-bold tracking-widest uppercase">Classic Products</span>
              <h2 className="text-4xl font-serif mt-2 text-shiyuan-dark">浙江省内研学</h2>
            </div>
            <a href="#" className="text-shiyuan-red font-medium hover:text-shiyuan-gold transition-colors mt-4 md:mt-0 flex items-center gap-1">
              查看全部案例 <ArrowRight size={16}/>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROVINCIAL_CASES.map((item) => (
              <div key={item.id} className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 bg-shiyuan-red text-white text-xs px-2 py-1 rounded">
                    省内
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.highlights.slice(0,2).map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-shiyuan-gold bg-shiyuan-gold/10 px-2 py-1 rounded-sm uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-serif group-hover:text-shiyuan-red transition-colors line-clamp-1">{item.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {item.description}
                  </p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center text-xs font-bold text-shiyuan-dark group-hover:text-shiyuan-red transition-colors uppercase tracking-wider">
                    查看详情 <ChevronRight size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Playground Section */}
      <AIPlayground />

      {/* National Cases */}
      <section id="national" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-shiyuan-gold font-bold tracking-widest uppercase">National Destination</span>
            <h2 className="text-4xl font-serif mt-2 text-shiyuan-dark">全国目的地产品</h2>
            <div className="w-24 h-1 bg-shiyuan-red mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {NATIONAL_CASES.map((item) => (
                <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="group block h-full">
                  <div className="relative overflow-hidden rounded-lg h-64 mb-4">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <div className="text-shiyuan-gold text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                            <MapPin size={12} /> {item.highlights[0]}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-white group-hover:text-shiyuan-gold transition-colors">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 px-1 group-hover:text-shiyuan-red transition-colors">{item.description}</p>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-shiyuan-dark text-shiyuan-light relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
        
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <span className="text-shiyuan-gold font-bold tracking-widest uppercase">Service System</span>
                <h2 className="text-4xl font-serif mt-2 text-white">服务体系</h2>
                <p className="text-white/60 mt-4 max-w-2xl mx-auto">以专业之心，铸造研学精品。全流程标准化服务，保障每一次出行。</p>
            </div>

            {/* Core Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {SERVICES.map((service, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:bg-white/10 transition-colors group rounded-lg">
                        <div className="mb-6 bg-shiyuan-gold/20 w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-serif mb-4 text-shiyuan-gold">{service.title}</h3>
                        <p className="text-sm opacity-70 leading-relaxed">{service.description}</p>
                    </div>
                ))}
            </div>

            {/* Service Process */}
            <div className="mb-20">
                <h3 className="text-2xl font-serif text-white mb-10 text-center">标准化服务流程</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {SERVICE_PROCESS.map((step, idx) => (
                        <div key={idx} className="relative">
                            <div className="text-6xl font-serif text-white/5 absolute -top-4 -left-2 font-bold z-0">{step.number}</div>
                            <div className="relative z-10 pl-6 border-l border-shiyuan-gold/30">
                                <h4 className="text-lg font-bold text-shiyuan-gold mb-2">{step.title}</h4>
                                <p className="text-sm text-white/60">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Service Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
                {SERVICE_STATS.map((stat, idx) => (
                    <div key={idx} className="text-center">
                        <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-sm text-shiyuan-gold uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Enterprise / About Section */}
      <section id="about" className="py-24 bg-shiyuan-light">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-serif text-shiyuan-dark">关于我们</h2>
                <div className="flex justify-center gap-8 mt-8 border-b border-gray-200">
                    {[
                        {id: 'intro', label: '企业介绍'},
                        {id: 'culture', label: '企业文化'},
                        {id: 'history', label: '发展历程'},
                        {id: 'team', label: '核心团队'},
                        {id: 'honors', label: '荣誉资质'},
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveAboutTab(tab.id as any)}
                            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeAboutTab === tab.id ? 'border-shiyuan-red text-shiyuan-red' : 'border-transparent text-gray-400 hover:text-shiyuan-dark'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-[400px]">
                {/* Intro Tab */}
                {activeAboutTab === 'intro' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in">
                        <div className="prose prose-lg text-gray-600">
                            <p className="leading-loose">{COMPANY_INFO.intro}</p>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <img src="https://picsum.photos/400/300?random=101" className="rounded-lg shadow-md" alt="Office" />
                                <img src="https://picsum.photos/400/300?random=102" className="rounded-lg shadow-md mt-8" alt="Team" />
                            </div>
                        </div>
                         <div className="relative">
                            <img src="https://picsum.photos/600/800?random=103" className="rounded-xl shadow-2xl" alt="Company Building" />
                            <div className="absolute -bottom-6 -left-6 bg-shiyuan-red text-white p-8 rounded-lg shadow-xl max-w-xs">
                                <p className="font-serif text-xl font-bold">"读万卷书，行诗意路"</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Culture Tab */}
                {activeAboutTab === 'culture' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
                        <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-shiyuan-gold text-center">
                            <div className="w-16 h-16 bg-shiyuan-light rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star className="text-shiyuan-gold" size={32}/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">核心价值观</h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {COMPANY_INFO.culture.values.map(v => (
                                    <span key={v} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{v}</span>
                                ))}
                            </div>
                        </div>
                         <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-shiyuan-red text-center">
                            <div className="w-16 h-16 bg-shiyuan-light rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="text-shiyuan-red" size={32}/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">企业愿景</h3>
                            <p className="text-gray-600 italic">"{COMPANY_INFO.culture.vision}"</p>
                        </div>
                         <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-900 text-center">
                            <div className="w-16 h-16 bg-shiyuan-light rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="text-blue-900" size={32}/>
                            </div>
                            <h3 className="text-xl font-bold mb-4">企业使命</h3>
                             <p className="text-gray-600 italic">"{COMPANY_INFO.culture.mission}"</p>
                        </div>
                         <div className="md:col-span-3 text-center mt-8 p-8 bg-white rounded-lg shadow-sm">
                            <h4 className="text-lg font-bold text-shiyuan-dark mb-2">经营理念</h4>
                            <p className="text-gray-600 text-lg">"{COMPANY_INFO.culture.philosophy}"</p>
                        </div>
                    </div>
                )}

                {/* History Tab */}
                {activeAboutTab === 'history' && (
                    <div className="max-w-4xl mx-auto animate-fade-in">
                        <div className="relative border-l-2 border-shiyuan-gold/30 ml-4 md:ml-0 md:pl-0 space-y-12">
                            {COMPANY_INFO.milestones.map((m, idx) => (
                                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center gap-6 group">
                                    <div className="absolute -left-[9px] top-0 md:static md:w-24 md:text-right font-bold text-shiyuan-red text-xl flex-shrink-0 bg-shiyuan-light z-10">
                                        {m.year}
                                    </div>
                                    <div className="hidden md:block w-4 h-4 rounded-full bg-shiyuan-gold flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex-grow w-full md:w-auto ml-6 md:ml-0 hover:shadow-md transition-shadow">
                                        <h4 className="text-lg font-bold mb-2">{m.title}</h4>
                                        <p className="text-gray-600 text-sm">{m.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                 {/* Team Tab */}
                 {activeAboutTab === 'team' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                        {COMPANY_INFO.team.map((member, idx) => (
                             <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg group">
                                <div className="h-64 overflow-hidden bg-gray-200">
                                    <img src={`https://picsum.photos/400/500?random=${200+idx}`} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"/>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <h3 className="text-xl font-bold font-serif">{member.name}</h3>
                                        <span className="text-xs font-bold text-shiyuan-red uppercase tracking-wider">{member.role}</span>
                                    </div>
                                    <div className="w-12 h-0.5 bg-shiyuan-gold mb-4"></div>
                                    <p className="text-gray-600 text-sm">{member.description}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                )}

                 {/* Honors Tab */}
                 {activeAboutTab === 'honors' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                        {COMPANY_INFO.honors.map((honor, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-lg">
                                <div className="bg-shiyuan-red/10 p-3 rounded-full text-shiyuan-red flex-shrink-0">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-shiyuan-dark mb-1">{honor.title}</h4>
                                    <p className="text-xs text-gray-400">Issued by Professional Association</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
         </div>
      </section>

      {/* Contact Form Footer */}
      <footer className="bg-shiyuan-dark text-white pt-20 pb-8">
         <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                 <div>
                    <h2 className="text-4xl font-serif mb-8 text-white">联系我们</h2>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        无论您是学校代表、家长还是合作伙伴，我们都期待与您交流。请填写右侧表单，我们将尽快与您取得联系。
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-white/80">
                            <Phone className="text-shiyuan-gold" />
                            <div>
                                <div className="font-bold">13605805395 (鲁老师)</div>
                                <div className="font-bold">15824461770 (研学小助手)</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-white/80">
                            <MapPin className="text-shiyuan-gold" />
                            <span>浙江省杭州市上城区天城路91号聚落工场B座611室</span>
                        </div>
                    </div>
                 </div>
                 
                 <div className="bg-white text-shiyuan-dark p-8 rounded-lg shadow-2xl">
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs font-bold mb-1 uppercase text-gray-500">姓名</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-shiyuan-red rounded" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1 uppercase text-gray-500">电话</label>
                                <input type="tel" className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-shiyuan-red rounded" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-xs font-bold mb-1 uppercase text-gray-500">邮箱</label>
                            <input type="email" className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-shiyuan-red rounded" />
                        </div>
                         <div>
                            <label className="block text-xs font-bold mb-1 uppercase text-gray-500">留言</label>
                            <textarea className="w-full bg-gray-50 border border-gray-200 p-3 h-32 resize-none focus:outline-none focus:border-shiyuan-red rounded"></textarea>
                        </div>
                        <button className="w-full bg-shiyuan-red text-white font-bold py-4 hover:bg-red-800 transition-colors rounded">
                            提交信息
                        </button>
                    </form>
                 </div>
             </div>
             
             <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
                <p>&copy; 2024 诗远研学 Shiyuan Study Tours. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">隐私政策</a>
                    <a href="#" className="hover:text-white transition-colors">服务条款</a>
                </div>
             </div>
         </div>
      </footer>
    </div>
  );
};

export default App;