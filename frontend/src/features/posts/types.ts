export interface Post {
  id?: number;
  title: string;
  location?: string;
  achieved_at?: string;
  content: string;
  image?: string;
  video?: string;
  is_blocked?: boolean;
  created_at?: string;
}
