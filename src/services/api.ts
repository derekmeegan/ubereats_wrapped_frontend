import { JobStatus, StartJobRequest, StartJobResponse } from '../types/api';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_ENDPOINT || !API_KEY) {
  throw new Error('Missing required environment variables: VITE_API_ENDPOINT and VITE_API_KEY');
}

export const api = {
  async startJob(userEmail: string): Promise<StartJobResponse> {
    const response = await fetch(`${API_ENDPOINT}/extract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({ userEmail } as StartJobRequest),
    });

    if (!response.ok) {
      throw new Error(`Failed to start job: ${response.statusText}`);
    }

    return { jobId: userEmail, status: 'starting' };
  },

  async getJobStatus(userEmail: string): Promise<JobStatus> {
    const response = await fetch(`${API_ENDPOINT}/extract/${userEmail}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get job status: ${response.statusText}`);
    }

    console.log('Job status response:', response);

    return response.json();
  },
}; 