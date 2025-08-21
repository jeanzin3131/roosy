import React, { useState, useEffect } from 'react';
import { Share2, Gift, Users, TrendingUp, Eye, MousePointer, Award } from 'lucide-react';

const RoosyRoulette = () => {
  const [shares, setShares] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(false);
  const [prize, setPrize] = useState(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [uniqueLink, setUniqueLink] = useState('');

  // Métricas em tempo real
  const [metrics, setMetrics] = useState({
    totalVisitors: 2847,
    activeShares: 1923,
    completedShares: 1445,
    totalSpins: 1201,
    conversionRate: 75.2,
    viralCoefficient: 4.3,
    avgTimeOnSite: '3m 42s',
    returnUsers: 892
  });

  const prizes = [
    { name: 'Meia Banca', icon: '💎', probability: 5, value: 'meia-banca' },
    { name: 'R$ 100,00', icon: '💰', probability: 10, value: '100' },
    { name: 'Pack Estratégias', icon: '📚', probability: 35, value: 'pack' },
    { name: 'R$ 5,00', icon: '💵', probability: 50, value: '5' }
  ];

  useEffect(() => {
    // Gera link único para o usuário
    const userId = Math.random().toString(36).substr(2, 9);
    setUniqueLink(`https://roletaroosy.com/ref/${userId}`);

    // Simula atualizações de métricas em tempo real
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 3),
        activeShares: prev.activeShares + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleShare = (platform) => {
    const message = `🎰 ROLETA PREMIADA DA ROOSY DUARTE! 🎰\n\n💎 Ganhe MEIA BANCA\n💰 R$ 100,00 em dinheiro\n📚 Pack de estratégias exclusivas\n\nClique aqui e gire GRÁTIS: ${uniqueLink}`;
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message)}`,
      telegram: `https://t.me/share/url?url=${uniqueLink}&text=${encodeURIComponent(message)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${uniqueLink}`,
      instagram: `https://www.instagram.com/` // Instagram stories
    };

    // Simula compartilhamento e incrementa contador
    window.open(urls[platform], '_blank');
    setTimeout(() => {
      if (shares < 5) {
        setShares(prev => {
          const newShares = prev + 1;
          if (newShares >= 5) {
            setCanSpin(true);
          }
          return newShares;
        });
      }
    }, 2000);
  };

  const spinRoulette = () => {
    if (!canSpin || spinning) return;
    
    setSpinning(true);
    
    // Simula giro da roleta
    setTimeout(() => {
      const random = Math.random() * 100;
      let cumulative = 0;
      let selectedPrize = prizes[prizes.length - 1];
      
      for (const p of prizes) {
        cumulative += p.probability;
        if (random <= cumulative) {
          selectedPrize = p;
          break;
        }
      }
      
      setPrize(selectedPrize);
      setSpinning(false);
      
      // Atualiza métricas
      setMetrics(prev => ({
        ...prev,
        totalSpins: prev.totalSpins + 1
      }));
    }, 3000);
  };

  const buySpins = () => {
    const message = `Olá Roosy! Quero comprar giros extras na sua roleta premiada! 🎰`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-pink-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                ROLETA PREMIADA DA ROOSY DUARTE
              </h1>
              <p className="text-pink-200 text-sm">Compartilhe com 5 pessoas e GIRE GRÁTIS!</p>
            </div>
            <button 
              onClick={() => setShowMetrics(!showMetrics)}
              className="flex items-center space-x-2 bg-pink-600/20 border border-pink-400/30 px-4 py-2 rounded-lg hover:bg-pink-600/30 transition-all"
            >
              <TrendingUp size={20} />
              <span>Métricas</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Coluna Principal - Roleta */}
          <div className="lg:col-span-2">
            <div className="bg-black/40 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8 text-center">
              
              {/* Contador de Compartilhamentos */}
              <div className="mb-8">
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <Share2 className="text-pink-400" size={24} />
                  <span className="text-xl font-semibold">Compartilhamentos: {shares}/5</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(shares / 5) * 100}%` }}
                  ></div>
                </div>

                {!canSpin && (
                  <p className="text-pink-200 mb-6">Compartilhe seu link com mais {5 - shares} pessoas para liberar o giro!</p>
                )}
              </div>

              {/* Roleta */}
              <div className="mb-8">
                <div className={`relative w-80 h-80 mx-auto border-8 border-gold-400 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 ${spinning ? 'animate-spin' : ''}`}>
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    {!spinning && !prize && (
                      <div className="text-center">
                        <Gift size={48} className="mx-auto mb-2 text-yellow-300" />
                        <p className="text-lg font-bold">GIRE E GANHE!</p>
                      </div>
                    )}
                    
                    {spinning && (
                      <div className="text-center">
                        <div className="animate-pulse">
                          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-lg font-bold">GIRANDO...</p>
                        </div>
                      </div>
                    )}

                    {prize && (
                      <div className="text-center">
                        <div className="text-6xl mb-2">{prize.icon}</div>
                        <p className="text-2xl font-bold text-yellow-300">{prize.name}</p>
                        {prize.value === 'meia-banca' && <p className="text-sm mt-2">PARABÉNS! Prêmio máximo!</p>}
                      </div>
                    )}
                  </div>
                  
                  {/* Ponteiro */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-300"></div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-4">
                {canSpin ? (
                  <button
                    onClick={spinRoulette}
                    disabled={spinning || prize}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105"
                  >
                    {spinning ? 'GIRANDO...' : prize ? 'PRÊMIO GANHO!' : '🎰 GIRAR ROLETA 🎰'}
                  </button>
                ) : (
                  <div className="bg-gray-700/50 text-gray-400 font-bold py-4 px-8 rounded-xl text-xl">
                    Complete os compartilhamentos para liberar
                  </div>
                )}

                <button
                  onClick={buySpins}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105"
                >
                  💰 COMPRAR GIROS EXTRAS
                </button>
              </div>

              {/* Link único */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">Seu link único:</p>
                <div className="flex items-center justify-between bg-gray-700 rounded p-2">
                  <span className="text-xs font-mono text-pink-300 truncate">{uniqueLink}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(uniqueLink)}
                    className="text-pink-400 hover:text-pink-300 ml-2"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            
            {/* Botões de Compartilhamento */}
            <div className="bg-black/40 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-center">Compartilhar Agora</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { platform: 'whatsapp', name: 'WhatsApp', color: 'bg-green-500', icon: '📱' },
                  { platform: 'telegram', name: 'Telegram', color: 'bg-blue-500', icon: '✈️' },
                  { platform: 'facebook', name: 'Facebook', color: 'bg-blue-600', icon: '📘' },
                  { platform: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: '📷' }
                ].map((social) => (
                  <button
                    key={social.platform}
                    onClick={() => handleShare(social.platform)}
                    className={`${social.color} hover:opacity-80 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <span>{social.icon}</span>
                    <span className="text-sm">{social.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prêmios */}
            <div className="bg-black/40 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-center">🏆 Prêmios Disponíveis</h3>
              <div className="space-y-3">
                {prizes.map((prize, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{prize.icon}</span>
                      <span className="font-semibold">{prize.name}</span>
                    </div>
                    <span className="text-sm text-gray-300">{prize.probability}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Métricas em Tempo Real */}
            {showMetrics && (
              <div className="bg-black/40 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center space-x-2">
                  <TrendingUp size={20} />
                  <span>Métricas Live</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Eye size={16} />
                      <span>Visitantes</span>
                    </div>
                    <div className="text-xl font-bold text-pink-300">{metrics.totalVisitors.toLocaleString()}</div>
                  </div>
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Share2 size={16} />
                      <span>Compartilhamentos</span>
                    </div>
                    <div className="text-xl font-bold text-pink-300">{metrics.activeShares.toLocaleString()}</div>
                  </div>
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <MousePointer size={16} />
                      <span>Taxa Conversão</span>
                    </div>
                    <div className="text-xl font-bold text-green-300">{metrics.conversionRate}%</div>
                  </div>
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Award size={16} />
                      <span>Total Giros</span>
                    </div>
                    <div className="text-xl font-bold text-pink-300">{metrics.totalSpins.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-300">Coeficiente Viral</div>
                    <div className="text-2xl font-bold text-green-300">{metrics.viralCoefficient}x</div>
                    <div className="text-xs text-gray-400">Cada usuário traz {metrics.viralCoefficient} pessoas</div>
                  </div>
                </div>
              </div>
            )}

            {/* Contato Roosy */}
            <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 border border-pink-400/30 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">👩‍💼</div>
              <h4 className="font-bold text-lg mb-2">Roosy Duarte</h4>
              <p className="text-sm text-gray-300 mb-4">Especialista em estratégias de iGaming</p>
              <button
                onClick={buySpins}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                💬 Falar com Roosy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé com estatísticas */}
      <div className="bg-black/50 border-t border-pink-500/20 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-pink-300">{metrics.totalVisitors.toLocaleString()}</div>
              <div className="text-gray-400">Pessoas participando</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-300">{metrics.totalSpins.toLocaleString()}</div>
              <div className="text-gray-400">Giros realizados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-300">{metrics.conversionRate}%</div>
              <div className="text-gray-400">Taxa de sucesso</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-300">{metrics.returnUsers.toLocaleString()}</div>
              <div className="text-gray-400">Usuários ativos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoosyRoulette;
