import { useState, useEffect, useCallback } from 'react';
import { JobStatus } from '../types/api';
import { api } from '../services/api';

export const useJobPolling = (jobId: string | null, pollingInterval: number = 3000) => {
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pollStatus = useCallback(async () => {
    if (!jobId) return;

    try {
      setError(null);
      const status = await api.getJobStatus(jobId);
      console.log('Job status:', status);
      setJobStatus(status);
      
      // Stop polling when job is completed, error, or user is logged in and extracting
      if (status.status === 'completed' || status.status === 'error' || status.status === 'extracting') {
        setIsPolling(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch job status');
      setIsPolling(false);
    }
  }, [jobId]);

  // Auto-start polling when jobId is set
  useEffect(() => {
    if (jobId) {
      console.log('Starting polling for new jobId:', jobId);
      setIsPolling(true);
    } else {
      setIsPolling(false);
      setJobStatus(null);
      setError(null);
    }
  }, [jobId]);

  useEffect(() => {
    if (!jobId || !isPolling) return;

    console.log('Polling status for job:', jobId);

    // Poll immediately
    pollStatus();

    // Set up interval
    const interval = setInterval(pollStatus, pollingInterval);

    return () => clearInterval(interval);
  }, [jobId, isPolling, pollingInterval, pollStatus]);

  const startPolling = useCallback(() => {
    if (jobId) {
      setIsPolling(true);
    }
  }, [jobId]);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  return {
    jobStatus,
    isPolling,
    error,
    startPolling,
    stopPolling,
  };
}; 