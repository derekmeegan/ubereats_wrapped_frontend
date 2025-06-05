export interface JobStatus {
  status: 'starting' | 'awaiting_login' | 'logged_in' | 'extracting' | 'completed' | 'error';
  liveViewUrl?: string;
  message?: string;
}

export interface StartJobRequest {
  userEmail: string;
}

export interface StartJobResponse {
  jobId: string;
  status: JobStatus['status'];
} 