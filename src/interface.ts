export interface IconSystemMessageType {
  icon: any;
  name: string;
  onPress?: () => void;
  color?: string;
}

export interface User {
  _id: number;
  name?: string;
}

export interface Bot {
  name: string;
  description: string;
  model: string;
  url: string;
  models: string[];
  func: Function[];
}

export interface Message {
  _id: string | number;
  text: string;
  createdAt: string;
  image?: string;
  user_id: string | number
  name: string
}

export interface Chat {
  id: number;
  title: string;
}

export interface ProfileAI {
  id: string;
  name: string;
  image: string
}
