export interface subFeautureModel {
  name: string;
  highlighted?: boolean; 
}

export interface FeautureModel {
  id: number;
  icon: string;
  title: string;
  picture: string;
  shortDescription: string;
  longDescription: string;
  subServices: subFeautureModel[];
}