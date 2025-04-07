import {  Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherHome,featherSmile } from '@ng-icons/feather-icons'

import { MoveDirection, OutMode, Container,Engine} from "@tsparticles/engine";
import { NgxParticlesModule, NgParticlesService } from "@tsparticles/angular";
import { confetti } from "@tsparticles/confetti";
import { loadSlim } from "@tsparticles/slim";

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, NgIcon, NgxParticlesModule],
  providers: [
    provideIcons({
      featherHome,
      featherSmile,
    })
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
    // particles settings
    particlesId = "tsparticles";
    
    particlesOptions = {
        background: {
            color: {
            value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
            onClick: {
                enable: true,
                mode: ["push"],
            },
            onHover: {
                enable: true,
                mode: ["repulse"],
            },
            resize: {
                enable: true,
            },
            },
            modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            },
        },
        particles: {
            color: {
                value: "#4fff2fa3",
            },
            links: {
                color: "#ffffff",
                distance: 75,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.bounce,
                    bottom: OutMode.destroy,
                    left: OutMode.destroy,
                },
                random: true,
                speed: 6,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 25 },
            },
        },
        detectRetina: true,
    };
    // confetti settings
    confettiId = "confetti";
    confettiOptions = {};

    constructor(private readonly ngParticlesService: NgParticlesService) {
    }

    ngOnInit() {
        void this.ngParticlesService.init(async (engine:Engine) => {
            await loadSlim(engine);
        });
    }
    
    async showConfetti(event: MouseEvent): Promise<void> {
        event.preventDefault();
        await confetti( 
            this.confettiId,
            {
            angle: 90,
            spread: 45,
            startVelocity: 45,
          });
    }

    particlesLoaded(container: Container): void {
        console.log(container);
    }

}
