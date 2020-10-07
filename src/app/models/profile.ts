export interface Profile {
  id: string;
  num_gscholar: number;
  num_linkedin: number;
  num_researchgate: number;
  num_microsoft: number;
  num_website: number;
  num_cv: number;
  num_dissertation: number;

  num_valid_gscholar: number;
  num_valid_linkedin: number;
  num_valid_researchgate: number;
  num_valid_microsoft: number;
  num_valid_website: number;
  num_valid_cv: number;
  num_valid_dissertation: number;

  nonefound_gscholar: boolean;
  nonefound_linkedin: boolean;
  nonefound_researchgate: boolean;
  nonefound_microsoft: boolean;
  nonefound_website: boolean;
  nonefound_cv: boolean;
  nonefound_dissertation: boolean;

  nonefound_gscholar_comments: string;
  nonefound_linkedin_comments: string;
  nonefound_researchgate_comments: string;
  nonefound_microsoft_comments: string;
  nonefound_website_comments: string;
  nonefound_cv_comments: string;
  nonefound_dissertation_comments: string;

  nonefound_gscholar_up: number;
  nonefound_linkedin_up: number;
  nonefound_researchgate_up: number;
  nonefound_microsoft_up: number;
  nonefound_website_up: number;
  nonefound_cv_up: number;
  nonefound_dissertation_up: number;

  nonefound_gscholar_down: number;
  nonefound_linkedin_down: number;
  nonefound_researchgate_down: number;
  nonefound_microsoft_down: number;
  nonefound_website_down: number;
  nonefound_cv_down: number;
  nonefound_dissertation_down: number;
}
