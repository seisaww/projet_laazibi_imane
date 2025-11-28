import {Component , EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl,FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; 
import { UserService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../models/utilisateur.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})

export class Inscription   {
  formulaire = new FormGroup({
    id: new FormControl<number | null>(null), 
    nom: new FormControl('', Validators.required),
    prenom: new FormControl ('', Validators.required),
    identifiant: new FormControl('', Validators.required),
    motDePasse: new FormControl('', [ Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]) 
  });

  get motDePasse() {
    return this.formulaire.get('motDePasse');
  }

  @Output() userDeclaree = new EventEmitter<Utilisateur>();   

  constructor(private userService: UserService) {} 

  send() {
      if (this.formulaire.valid){
        
        const formValue = this.formulaire.value;
        const id = formValue.id; 
  
        const utilisateur: Utilisateur = {
            id: id || 0, 
            nom: formValue.nom!,
            prenom: formValue.prenom!,
            identifiant: formValue.identifiant!,
            motDePasse: formValue.motDePasse!
        };

        const obs$ = this.userService.createUser(utilisateur);     
  
        obs$.subscribe({
            next: (resultat: Utilisateur) => { 
                this.userDeclaree.emit(resultat); 
                this.formulaire.reset();
            },
            error: (error: any) => { 
                console.error('Erreur de sauvegarde:', error);
                alert("Erreur lors de l'enregistrement de l'utilisateur.");
            }
        });
      } else {
        alert("Formulaire invalide.");
      }
    }
    
}
