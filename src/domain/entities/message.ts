export interface Message {
  id: string;
  who: string; // agent id OR "self"
  timestamp: string; // HH:MM display string
  body: string;
  live?: boolean; // typing in progress
}
