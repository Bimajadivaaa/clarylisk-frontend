/* eslint-disable no-restricted-imports */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Creator } from '@/lib/data/creator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import SocialLinks from './social-links';

interface CreatorCardProps {
  creator: Creator;
}

export default function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Card className="bg-gray-900/70 border border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors group">
      <div className="relative h-40 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={creator.image}
            alt={creator.username}
            width={100}
            height={100}
            className="rounded-full border-2 border-white/20"
          />
        </div>
        <div className="absolute top-2 right-2">
          {creator.verified && (
            <Badge className="bg-blue-600 hover:bg-blue-700 text-xs">Verified</Badge>
          )}
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="text-center mb-3">
          <h3 className="text-white font-bold text-lg">{creator.username}</h3>
          <p className="text-gray-400 text-sm line-clamp-2 h-10">{creator.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-800/50 rounded-md p-2 text-center">
            <p className="text-white font-medium">{creator.donationsReceived} ETH</p>
            <p className="text-gray-400 text-xs">Received</p>
          </div>
          <div className="bg-gray-800/50 rounded-md p-2 text-center">
            <p className="text-white font-medium">{creator.donations}</p>
            <p className="text-gray-400 text-xs">Donations</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-2">
          <SocialLinks socialLinks={creator.socialLinks} />
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-800 bg-gray-900/30 pt-3 pb-3">
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          asChild
        >
          <Link href={`/creators/${creator.id}`}>
            <span className="flex items-center justify-center">
              View Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}