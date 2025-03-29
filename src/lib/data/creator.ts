export interface Creator {
    id: string;
    username: string;
    description: string;
    walletAddress: string;
    image: string;
    donationsReceived: number;
    verified: boolean;
    followers: number;
    donations: number;
    category: string;
    socialLinks: {
      twitter?: string;
      instagram?: string;
      youtube?: string;
      facebook?: string;
    };
  }
  
  // Mock creator data
  export const CREATORS: Creator[] = [
    {
      id: '1',
      username: 'crypto_sarah',
      description: 'Web3 enthusiast and NFT artist sharing blockchain education content',
      walletAddress: '0x1234...5678',
      image: 'https://i.pravatar.cc/300?img=1',
      donationsReceived: 3.45,
      verified: true,
      followers: 12500,
      donations: 234,
      category: 'art',
      socialLinks: {
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    {
      id: '2',
      username: 'blockchain_dev',
      description: 'Smart contract developer creating tutorials on DeFi and Web3 development',
      walletAddress: '0x8765...4321',
      image: 'https://i.pravatar.cc/300?img=2',
      donationsReceived: 12.1,
      verified: true,
      followers: 8700,
      donations: 156,
      category: 'tech',
      socialLinks: {
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com'
      }
    },
    {
      id: '3',
      username: 'defi_analyst',
      description: 'DeFi analyst providing deep insights on various blockchain protocols',
      walletAddress: '0xabcd...efgh',
      image: 'https://i.pravatar.cc/300?img=3',
      donationsReceived: 7.82,
      verified: false,
      followers: 5300,
      donations: 98,
      category: 'finance',
      socialLinks: {
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com'
      }
    },
    {
      id: '4',
      username: 'nft_collector',
      description: 'NFT enthusiast showcasing rare digital art collections and market insights',
      walletAddress: '0xijkl...mnop',
      image: 'https://i.pravatar.cc/300?img=4',
      donationsReceived: 5.23,
      verified: true,
      followers: 9200,
      donations: 187,
      category: 'art',
      socialLinks: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com'
      }
    },
    {
      id: '5',
      username: 'crypto_educator',
      description: 'Blockchain educator making complex crypto concepts simple for beginners',
      walletAddress: '0xqrst...uvwx',
      image: 'https://i.pravatar.cc/300?img=5',
      donationsReceived: 9.75,
      verified: true,
      followers: 15800,
      donations: 312,
      category: 'education',
      socialLinks: {
        youtube: 'https://youtube.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: '6',
      username: 'metaverse_builder',
      description: 'Virtual world architect creating immersive metaverse experiences',
      walletAddress: '0xyz1...234a',
      image: 'https://i.pravatar.cc/300?img=6',
      donationsReceived: 4.56,
      verified: false,
      followers: 7400,
      donations: 143,
      category: 'gaming',
      socialLinks: {
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    {
      id: '7',
      username: 'dao_strategist',
      description: 'DAO governance expert advising on decentralized organization structures',
      walletAddress: '0xbcd1...234e',
      image: 'https://i.pravatar.cc/300?img=7',
      donationsReceived: 6.37,
      verified: true,
      followers: 6800,
      donations: 121,
      category: 'business',
      socialLinks: {
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com'
      }
    },
    {
      id: '8',
      username: 'crypto_artist',
      description: 'Digital artist exploring the intersection of blockchain and creative expression',
      walletAddress: '0xfgh1...678i',
      image: 'https://i.pravatar.cc/300?img=8',
      donationsReceived: 8.92,
      verified: true,
      followers: 10500,
      donations: 201,
      category: 'art',
      socialLinks: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com'
      }
    }
  ];