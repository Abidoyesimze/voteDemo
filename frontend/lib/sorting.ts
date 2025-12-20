import type { Contender } from '@/types/voting';

export type SortOption = 'votes-desc' | 'votes-asc' | 'code-asc' | 'code-desc';
export type FilterOption = 'all' | 'leading' | 'trailing';

export function sortContenders(contenders: Contender[], sortOption: SortOption): Contender[] {
  const sorted = [...contenders];

  switch (sortOption) {
    case 'votes-desc':
      return sorted.sort((a, b) => b.voteCount - a.voteCount);
    case 'votes-asc':
      return sorted.sort((a, b) => a.voteCount - b.voteCount);
    case 'code-asc':
      return sorted.sort((a, b) => a.code.localeCompare(b.code));
    case 'code-desc':
      return sorted.sort((a, b) => b.code.localeCompare(a.code));
    default:
      return sorted;
  }
}

export function filterContenders(
  contenders: Contender[],
  filterOption: FilterOption,
  totalVotes: number
): Contender[] {
  if (filterOption === 'all' || totalVotes === 0) {
    return contenders;
  }

  const sorted = sortContenders(contenders, 'votes-desc');
  const midpoint = Math.ceil(sorted.length / 2);

  switch (filterOption) {
    case 'leading':
      return sorted.slice(0, midpoint);
    case 'trailing':
      return sorted.slice(midpoint);
    default:
      return contenders;
  }
}

