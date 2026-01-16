import { Utilisateur } from "./utilisateur.model"; 

export interface Pollution {
  id: number; 
  titre: string;
  type_pollution: string;
  description: string;
  date_observation: string; 
  lieu: string;
  latitude: number;
  longitude: number;
  photo_url?: string;
  id_user?: number;

  utilisateur?: {
        identifiant: string;
        nom: string;
        prenom: string;
    };
}