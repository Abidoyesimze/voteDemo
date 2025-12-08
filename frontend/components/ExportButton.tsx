'use client';

import { useState } from 'react';
import { exportAsJSON, exportAsCSV, exportAsText, VotingResults } from '@/lib/export';
import { useToast } from './ToastProvider';
import Button from './ui/Button';

interface ExportButtonProps {
  data: VotingResults;
  format?: 'json' | 'csv' | 'txt';
  className?: string;
}

export default function ExportButton({ data, format = 'json', className }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { success, error: showError } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      
      switch (format) {
        case 'json':
          exportAsJSON(data, `voting-results-${timestamp}.json`);
          break;
        case 'csv':
          exportAsCSV(data, `voting-results-${timestamp}.csv`);
          break;
        case 'txt':
          exportAsText(data, `voting-results-${timestamp}.txt`);
          break;
      }
      
      success(`Results exported as ${format.toUpperCase()}`);
    } catch (err) {
      showError('Failed to export results');
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const formatLabels = {
    json: 'Export JSON',
    csv: 'Export CSV',
    txt: 'Export TXT',
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      isLoading={isExporting}
      leftIcon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      }
      className={className}
    >
      {formatLabels[format]}
    </Button>
  );
}

