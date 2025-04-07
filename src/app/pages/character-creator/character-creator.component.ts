import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatCard } from '@angular/material/card'
import { ThemeService } from '../../../services/theme.service';

import { NgIcon } from '@ng-icons/core';    
import {MatIconModule} from '@angular/material/icon';

import { 
    Character, 
    BodyPartConfig, 
    EyeStyle, 
    eyeColors, 
    eyeStyles,
    skinColors 
} from './character';



@Component({
  selector: 'app-forms',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDivider,
    MatCard
  ],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.scss'
})
export class CharacterCreatorComponent {
  title = 'Character Creator';

  character: Character = {
    name: 'Character Name',
    skin: '#ffdfcf',
    head: { width: 100, height: 100 },
    body: { width: 100, height: 100 },
    arms: {
        left: { width: 100, height: 100 },
        right: { width: 100, height: 100 }
    },
    legs: {
        left: { width: 100, height: 100 },
        right: { width: 100, height: 100 }
    },
    eyes: { 
        color: '#000000', 
        style: { classList: 'w-1 h-2' } 
    }
  };

  // settings constants
  eyeColors = eyeColors;
  eyeStyles = eyeStyles;
  skinColors = skinColors;

  // rotation settings
  zPos = 90;

  settingsForm: FormGroup;

  constructor(private themeService: ThemeService, private fb: FormBuilder) {
    const eye: EyeStyle = {color:'#000000', style: {classList: 'w-1 h-2'}};
    this.settingsForm = this.fb.group({
      name: [''],
      skin: [''],
      head: [0],
      body: [0],
      armLeft: [0],
      armRight: [0],
      legLeft: [0],
      legRight: [0],
      eyes: [eye]
    });
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme();
  }

  setEyeColor(color:string) {
    const eye = this.settingsForm.get('eyes')?.value;
    eye.color = color;
    this.settingsForm.get('eyes')?.setValue(eye);
  }

  setEyeStyle(style:object) {
    const eye = this.settingsForm.get('eyes')?.value;
    eye.style = style;
    this.settingsForm.get('eyes')?.setValue(eye);
  }

  ngOnInit() {
    // Subscribe to form changes if needed
    this.settingsForm.valueChanges.subscribe(values => {
      console.log('Form values changed:', values);
    });
  }

}