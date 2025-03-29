'use client';

import { useState, useEffect } from 'react';
import { CREATORS } from '@/lib/data/creator';
import CreatorGridView from '@/components/explore/creator-grid-view';
import CreatorListView from '@/components/explore/creator-list-view';
import ExploreFilters from '@/components/explore/explore-filter';
import ExploreHeader from '@/components/explore/explore-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('popular');
  const [filteredCreators, setFilteredCreators] = useState(CREATORS);

  // Filter and sort creators based on search, category, and sort criteria
  useEffect(() => {
    let result = [...CREATORS];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(creator => 
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (category !== 'all') {
      result = result.filter(creator => creator.category === category);
    }
    
    // Apply sorting
    if (sort === 'popular') {
      result = result.sort((a, b) => b.followers - a.followers);
    } else if (sort === 'donations') {
      result = result.sort((a, b) => b.donationsReceived - a.donationsReceived);
    } else if (sort === 'newest') {
      // In a real app, you'd sort by creation date
      result = result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
    
    setFilteredCreators(result);
  }, [searchTerm, category, sort]);

  return (
    <main className="min-h-screen bg-black pb-20 pt-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0,rgba(0,0,0,0)_70%)]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ExploreHeader />
        
        <ExploreFilters 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {/* Main content with tabs */}
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="text-white text-sm">
              {filteredCreators.length} creators found
            </div>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="grid" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                Grid View
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                List View
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Grid View */}
          <TabsContent value="grid" className="mt-0">
            <CreatorGridView creators={filteredCreators} />
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="mt-0">
            <CreatorListView creators={filteredCreators} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}