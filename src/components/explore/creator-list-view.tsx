/* eslint-disable no-restricted-imports */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Creator } from '@/lib/data/creator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SocialLinks from './social-links';

interface CreatorListViewProps {
  creators: Creator[];
}

export default function CreatorListView({ creators }: CreatorListViewProps) {
  return (
    <div className="space-y-4">
      {creators.map((creator) => (
        <Card key={creator.id} className="bg-gray-900/70 border border-gray-800 hover:border-purple-500/50 transition-colors">
          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <Image
                src={creator.image}
                alt={creator.username}
                width={80}
                height={80}
                className="rounded-full border-2 border-white/20"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-bold text-lg flex items-center">
                    {creator.username}
                    {creator.verified && (
                      <Badge className="ml-2 bg-blue-600 hover:bg-blue-700 text-xs">Verified</Badge>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm">{creator.description}</p>
                </div>
                <div className="hidden md:flex gap-2">
                  <SocialLinks socialLinks={creator.socialLinks} />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="bg-gray-800/50 rounded-md p-1.5 text-center">
                  <p className="text-white font-medium">{creator.donationsReceived} ETH</p>
                  <p className="text-gray-400 text-xs">Received</p>
                </div>
                <div className="bg-gray-800/50 rounded-md p-1.5 text-center">
                  <p className="text-white font-medium">{creator.donations}</p>
                  <p className="text-gray-400 text-xs">Donations</p>
                </div>
                <div className="bg-gray-800/50 rounded-md p-1.5 text-center">
                  <p className="text-white font-medium">{creator.followers.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">Followers</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="text-gray-400 text-sm">
                  <span className="font-medium text-gray-300">Wallet:</span> {creator.walletAddress}
                </div>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="sm"
                  asChild
                >
                  <Link href={`/creators/${creator.id}`}>
                    <span className="flex items-center justify-center">
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      {/* Empty state if no creators found */}
      {creators.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-white/60 text-lg">No creators found matching your filters.</p>
          <p className="text-white/40 mt-2">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}