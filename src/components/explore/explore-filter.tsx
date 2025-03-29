import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ExploreFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
}

export default function ExploreFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sort,
  setSort
}: ExploreFiltersProps) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4">
      <div className="relative md:col-span-2">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search creators by name or description..."
          className="pl-10 bg-gray-800/50 border-gray-700 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="art">Art & NFTs</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="finance">Finance & DeFi</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="gaming">Gaming & Metaverse</SelectItem>
            <SelectItem value="business">Business & DAOs</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="donations">Highest Donations</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}