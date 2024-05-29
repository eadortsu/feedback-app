export interface Feedback {
  _id: string;
  name: string;
  email: string;
  type: 'Bug' | 'Suggestion';
  message: string;
  createdAt: string;
}
